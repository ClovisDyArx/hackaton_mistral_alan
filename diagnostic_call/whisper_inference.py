from fastapi import FastAPI, File, UploadFile
import whisper
import io

app = FastAPI()

# Load Whisper model
model = whisper.load_model("large")


@app.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...)):
    # Read the file as bytes
    file_bytes = await file.read()

    # Convert the bytes into a file-like object
    audio_file = io.BytesIO(file_bytes)

    # Use Whisper model to transcribe the audio
    transcription = model.transcribe(audio_file, fp16=False)

    # Return the transcription
    return {"transcription": transcription['text']}


def get_transcribe(audio: str, language: str = 'en'):
    transcript = model.transcribe(audio=audio, language=language, verbose=True)
    return transcript["text"]


"""
# Example usage : local
if __name__ == "__main__":
    audio_file = sys.argv[1]
    result = get_transcribe(audio=audio_file)
    print('-'*50)
    print(result)
"""


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
