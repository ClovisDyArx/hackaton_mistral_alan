from flask import Flask, request, jsonify
import whisper

app = Flask(__name__)
model = whisper.load_model("large")


@app.route('/transcribe', methods=['POST'])
def transcribe():
    data = request.json
    audio_path = data['audio']
    language = data.get('language', 'en')
    transcript = get_transcribe(audio=audio_path, language=language)
    return jsonify({'text': transcript})


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
