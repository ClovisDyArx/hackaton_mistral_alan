import whisper
import sys


model = whisper.load_model("large")

def get_transcribe(audio: str, language: str = 'en'):
    return model.transcribe(audio=audio, language=language, verbose=True)

if __name__ == "__main__":
    audio_file = sys.argv[1]
    result = get_transcribe(audio=audio_file)
    print('-'*50)
    print(result.get('text', ''))

