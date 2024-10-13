from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import vertexai  # pip install vertexai
from vertexai.generative_models import GenerativeModel
import uvicorn
import whisper
from transformers import pipeline

import os
import tempfile
from gemini_prompt import gem_prompt_hospital, gem_prompt_doctor, mist_prompt

from mistral_inference.transformer import Transformer
from mistral_inference.generate import generate

from mistral_common.tokens.tokenizers.mistral import MistralTokenizer
from mistral_common.protocol.instruct.messages import UserMessage, AssistantMessage
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

sentiment_analysis = pipeline(
    "sentiment-analysis",
    framework="pt",
    model="SamLowe/roberta-base-go_emotions",
    device=0
)

def analyze_sentiment(text):
    results = sentiment_analysis(text)
    sentiment_results = {
        result["label"]: result["score"] for result in results
    }
    return sentiment_results

def get_sentiment_emoji(sentiment):
    # Define the mapping of sentiments to emojis
    emoji_mapping = {
        "disappointment": "😞",
        "sadness": "😢",
        "annoyance": "😠",
        "neutral": "😐",
        "disapproval": "👎",
        "realization": "😮",
        "nervousness": "😬",
        "approval": "👍",
        "joy": "😄",
        "anger": "😡",
        "embarrassment": "😳",
        "caring": "🤗",
        "remorse": "😔",
        "disgust": "🤢",
        "grief": "😥",
        "confusion": "😕",
        "relief": "😌",
        "desire": "😍",
        "admiration": "😌",
        "optimism": "😊",
        "fear": "😨",
        "love": "❤️",
        "excitement": "🎉",
        "curiosity": "🤔",
        "amusement": "😄",
        "surprise": "😲",
        "gratitude": "🙏",
        "pride": "🦁"
    }
    return emoji_mapping.get(sentiment, "")

def display_sentiment_results(sentiment_results):
    sentiment_text = ""
    for sentiment, score in sentiment_results.items():
        emoji = get_sentiment_emoji(sentiment)
        sentiment_text += f"{sentiment} {emoji}\n"
    return sentiment_text

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

def get_prompt(request_type, whisper_prompt):
    if request_type == "hospital":
        return gem_prompt_hospital + whisper_prompt
    else:
        return gem_prompt_doctor + whisper_prompt


@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):

    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmpfile:
        tmpfile.write(await file.read())
        tmpfile_path = tmpfile.name

    result = model.transcribe(tmpfile_path)
    whisper_output = result['text']
    print(f"Whisper output: {whisper_output}")

    # Emotions detection
    sentiment_results = analyze_sentiment(whisper_output)
    sentiment_output = display_sentiment_results(sentiment_results)
    print(f"Whisper emotions output: {sentiment_results}: {sentiment_output}")

    os.remove(tmpfile_path)

    whisper_output = result['text']

    # Use Gemini to extract data with efficiency
    result = gem_model.generate_content(get_prompt(file.filename, whisper_output))
    gemini_output = result.text

    # Use Mistral fine-tuned model to get the possible diseases
    completion_request = ChatCompletionRequest(messages=[AssistantMessage(content=mist_prompt), UserMessage(content=gemini_output)])
    tokens = tokenizer.encode_chat_completion(completion_request).tokens

    out_tokens, _ = generate([tokens], model_mistral, max_tokens=256, temperature=0.3, eos_id=tokenizer.instruct_tokenizer.tokenizer.eos_id)
    mistral_output = tokenizer.instruct_tokenizer.tokenizer.decode(out_tokens[0])

    # Return the transcription
    return {"raw_transcription": whisper_output, "transcription": gemini_output, "predictions": mistral_output, "emotions": sentiment_output}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)

