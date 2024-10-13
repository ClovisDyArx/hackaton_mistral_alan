"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AudioAnimation = ({ isRecording, isPlaying }: { isRecording: boolean; isPlaying: boolean }) => (
  <div className="flex justify-center items-center h-16 w-full">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`h-full w-2 bg-primary mx-1 rounded-full ${
          isRecording ? 'animate-recording' : isPlaying ? 'animate-playing' : ''
        }`}
        style={{
          animationDelay: `${i * 0.15}s`,
          animationDuration: isPlaying ? '0.5s' : '1s'
        }}
      ></div>
    ))}
  </div>
);

export default function SubmitPage() {
  const [mode, setMode] = useState("recording");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [report, setReport] = useState<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (mode === "recording") {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };
          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            setAudioBlob(audioBlob);
          };
        });
    }
  }, [mode]);

  const startRecording = () => {
    audioChunksRef.current = [];
    mediaRecorderRef.current?.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const playRecording = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      setIsPlaying(true);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  const sendAudio = async () => {
    if (audioBlob) {
      // Here you would typically send the audio to your server
      try {
        const formData = new FormData();
        formData.append("file", audioBlob, "audio.mp3");

        const response = await fetch("http://localhost:8080/transcribe", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        // Parse the JSON-like transcription content
        let parsedTranscription;
        try {
          parsedTranscription = JSON.parse(result.transcription.replace(/```json\n|```/g, ''));
        } catch (e) {
          console.error("Error parsing transcription:", e);
          parsedTranscription = { summary: "Error parsing summary", symptoms: [] };
        }

        const summary = parsedTranscription.summary || "No summary available";
        const symptoms = parsedTranscription.symptoms || [];

        const analysis = symptoms !== [] ? `${summary}` + `\nSymptoms:\n` +
            symptoms.map(symptom =>
                ` - ${symptom.symptom}`
            ).join("\n") : `${summary}`;

        const recommendation = `${result.predictions}`;

        setMode("report");
        setReport({
          patientName: "John Doe",
          recordingDate: new Date().toISOString(),
          duration: "2:30",
          analysis: analysis,
          recommendation: recommendation,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      // For this example, we'll just simulate a response
    }
  };

  if (mode === "report") {
    return (

    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen w-full">
      <div className="container mx-auto p-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Audio Analysis Report</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium">Patient Name</dt>
                <dd>{report.patientName}</dd>
              </div>
              <div>
                <dt className="font-medium">Recording Date</dt>
                <dd>{new Date(report.recordingDate).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="font-medium">Duration</dt>
                <dd>{report.duration}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-medium">Analysis</dt>
                <dd>{report.analysis}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-medium">Recommendation</dt>
                <dd>{report.recommendation}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
      </div>
    );
  }

  return (

    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen w-full">

    <div className="container mx-auto p-6">
      <Card className="w-full max-w-md mx-auto mb-6 bg-red-100 border-red-300">
        <CardContent className="p-4">
          <p className="text-red-700 font-bold text-center">
            WARNING: Do not use this service for medical emergencies. If you are experiencing a medical emergency, please call your local emergency services immediately.
          </p>
        </CardContent>
      </Card>


      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Record Your Symptoms</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <AudioAnimation isRecording={isRecording} isPlaying={isPlaying} />
          <div className="flex space-x-2">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                disabled={isPlaying}
              >
                Start Recording
              </Button>
            ) : (
              <Button
                onClick={stopRecording}
                variant="destructive"
              >
                Stop Recording
              </Button>
            )}
            {audioBlob && (
              <>
                <Button
                  onClick={playRecording}
                  variant="outline"
                  disabled={isRecording || isPlaying}
                >
                  Play
                </Button>
                <Button
                  onClick={sendAudio}
                  disabled={isRecording || isPlaying}
                >
                  Send
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md mx-auto mt-6 bg-blue-100 border-blue-300">
        <CardContent className="p-4">
          <p className="text-blue-700 text-center">
            Your privacy is important to us. All data submitted through this service is anonymized to protect your personal information.
          </p>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
