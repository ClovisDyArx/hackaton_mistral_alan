from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import whisper
import io
import numpy as np
import soundfile as sf
from pydub import AudioSegment

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load Whisper model
model = whisper.load_model("large")


@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    print("Received audio file")

    # Read the file as bytes
    file_bytes = await file.read()

    print("file_bytes")
    # Convert the bytes into a file-like object
    audio_file = io.BytesIO(file_bytes)

    print("audio_file")
    # Use pydub to read the audio file and convert it to WAV
    audio_segment = AudioSegment.from_file(audio_file)
    wav_file = io.BytesIO()
    audio_segment.export(wav_file, format="wav")

    print("audio_segment")
    # Reset the buffer position to the beginning
    wav_file.seek(0)

    print("wav_file")
    # Read audio data using soundfile into a NumPy array
    audio_data, sample_rate = sf.read(wav_file)

    print("audio_data")
    # Ensure the audio data is in float32 format
    audio_data = audio_data.astype(np.float32)

    print("audio_data")
    # Use Whisper model to transcribe the audio
    transcription = model.transcribe(audio_data, fp16=False)

    print(transcription['text'])
    # Return the transcription
    return {"transcription": transcription['text']}


@app.get("/hello")
def hello():
    return {"message": "Hello World"}


def get_transcribe(audio: str, language: str = 'en'):
    transcript = model.transcribe(audio=audio, language=language, verbose=True)
    return transcript["text"]


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8080)
