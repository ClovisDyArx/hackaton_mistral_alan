from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import vertexai  # pip install vertexai
from vertexai.generative_models import GenerativeModel
import uvicorn
import whisper
import os
import tempfile
from gemini_prompt import gem_prompt

from mistral_inference.transformer import Transformer
from mistral_inference.generate import generate

from mistral_common.tokens.tokenizers.mistral import MistralTokenizer
from mistral_common.protocol.instruct.messages import UserMessage
from mistral_common.protocol.instruct.request import ChatCompletionRequest

app = FastAPI()

# Update CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper model
model = whisper.load_model("large")

# Load Gemini
PROJECT_ID = "mistral-alan-hack24par-807"
MODEL = "gemini-1.5-pro-002"

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/admin/.config/gcloud/application_default_credentials.json"
vertexai.init(project=PROJECT_ID, location="europe-west9")
gem_model = GenerativeModel(MODEL)

# Load mistral fine-tuned
tokenizer = MistralTokenizer.from_file("/home/admin/mistral_models/tekken.json")
model_mistral = Transformer.from_folder("/home/admin/mistral_models")
model_mistral.load_lora("/home/admin/mistral-finetune/run_dir/checkpoints/checkpoint_000300/consolidated/lora.safetensors")


@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):

    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmpfile:
        tmpfile.write(await file.read())
        tmpfile_path = tmpfile.name

    result = model.transcribe(tmpfile_path)

    os.remove(tmpfile_path)

    whisper_output = result['text']

    result = gem_model.generate_content(gem_prompt + whisper_output)
    gemini_output = result.text

    completion_request = ChatCompletionRequest(messages=[UserMessage(content=gemini_output)])
    tokens = tokenizer.encode_chat_completion(completion_request).tokens

    out_tokens, _ = generate([tokens], model_mistral, max_tokens=256, temperature=0.3, eos_id=tokenizer.instruct_tokenizer.tokenizer.eos_id)
    mistral_output = tokenizer.instruct_tokenizer.tokenizer.decode(out_tokens[0])

    return {"transcription": gemini_output, "predictions": mistral_output}

@app.get("/hello")
def hello():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)

