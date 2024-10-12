from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import vertexai  # pip install vertexai
from vertexai.generative_models import GenerativeModel
import uvicorn
import whisper
import os
import tempfile
from gemini_prompt import gem_prompt

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

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    print("Received audio file")

    # Create a temporary file to save the uploaded audio
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmpfile:
        tmpfile.write(await file.read())
        tmpfile_path = tmpfile.name

    # Use Whisper model to transcribe the audio
    result = model.transcribe(tmpfile_path)

    # Clean up temporary file
    os.remove(tmpfile_path)

    print(result['text'])
    response = gem_model.generate_content(gem_prompt + result['text'])
    print(f"response: {type(response.text)}, {response.text}")
    # Return the transcription
    return {"transcription": response.text}

@app.get("/hello")
def hello():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)

