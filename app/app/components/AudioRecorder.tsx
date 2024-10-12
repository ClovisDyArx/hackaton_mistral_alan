"use client";

import { useState, useRef } from 'react';

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        setAudioBlob(event.data);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const sendAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    const uniqueFileName = `recording_${Date.now()}.wav`; // TODO: find a better way to generate unique file names
    formData.append('audio', audioBlob, uniqueFileName);

    try {
      const response = await fetch('/patient/appointment/api/upload-audio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const audioFilePath = data.filePath; // Get the file path returned by the server
        await fetchTranscript(audioFilePath);
      } else {
        console.error('Error uploading audio');
      }
    } catch (error) {
      console.error('Error sending audio:', error);
    }
  };

  const fetchTranscript = async (filePath: string) => {
    try {
      const response = await fetch('/patient/appointment/api/get-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audioPath: filePath, language: 'en' }),
      });

      if (response.ok) {
        const data = await response.json();
        setTranscript(data.transcript);
      } else {
        console.error('Error fetching transcript');
      }
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button className="btn-primary" onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button className="btn-secondary" onClick={sendAudio} disabled={!audioBlob}>
        Send Audio
      </button>
      {transcript && <textarea className="mt-4 w-full p-2 border" rows={5} value={transcript} readOnly />}
    </div>
  );
}
