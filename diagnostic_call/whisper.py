import whisper
model = whisper.load_model('large')


def get_transcribe(audio: str, language: str = 'en'):
    return model.transcribe(audio=audio, language=language, verbose=True)


if __name__ == "__main__":
    result = get_transcribe(audio='test-audio.mp3',)
    print('-'*50)
    print(result.get('text', ''))
