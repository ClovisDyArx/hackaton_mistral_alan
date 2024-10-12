"use client";

import { useState, useRef } from "react";

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
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const sendAudio = async () => {
    if (!audioBlob) return;

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);

      await fetch("/api/speech", {
        method: "POST",
        body: formData,
      });
    } catch {}
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        className="btn-primary"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <button
        className="btn-secondary"
        onClick={sendAudio}
        disabled={!audioBlob}
      >
        Send Audio
      </button>
      {transcript && (
        <textarea
          className="mt-4 w-full p-2 border"
          rows={5}
          value={transcript}
          readOnly
        />
      )}
    </div>
  );
}
