"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Report, Symptom } from "../../types";

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
  const [report, setReport] = useState<Report | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

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
      setIsLoading(true);
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

        const patient_symptoms: Array<Symptom> = symptoms.map((symptom: any) => ({
          name: symptom.symptom,
          intensity: symptom.intensity,
          is_gone: symptom.is_gone
        }));

        setMode("report");
        setReport({
          full_text: result.raw_transcription,
          summary: summary,
          patient_symptoms: patient_symptoms,
          emotion_analysis: "TO_BE_DEFINED",
          predicted_disease: result.predictions,
          real_symptoms: [],
          real_disease: "",
          treament: [],
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleConfirm = async () => {
    setIsConfirmed(true);
    // Here you would typically send the confirmed report to your backend
    // For example:
    // await sendReportToBackend(report);
    console.log("Report confirmed:", report);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen w-full">
      <div className="container mx-auto p-6 flex">
        {/* Left side - Recording UI */}
        <div className="w-1/2 pr-3">
          <Card className="w-full mb-6 bg-red-100 border-red-300">
            <CardContent className="p-4">
              <p className="text-red-700 font-bold text-center">
                WARNING: Do not use this service for medical emergencies. If you are in need of immediate medical assistance, please call your local emergency services immediately.
              </p>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="mb-6">
              <CardTitle>Record Your Symptoms</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <AudioAnimation isRecording={isRecording} isPlaying={isPlaying} />
              <div style={{ width: "1px", height: "6px" }}></div>
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

          <Card className="w-full mt-6 bg-blue-100 border-blue-300">
            <CardContent className="p-4">
              <p className="text-blue-700 text-center">
                Your privacy is important to us. All data submitted through this service is anonymized to protect your personal information.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Report or Waiting message */}
        <div className="w-1/2 pl-3">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>
                {mode === "report" ? "Audio Analysis Report" : ""}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mode === "report" && report ? (
                <>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="font-bold text-lg mb-2">Summary</dt>
                      <dd className="bg-gray-100 p-3 rounded-md">{report.summary}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-lg mb-2">Patient Symptoms</dt>
                      <dd>
                        <ul className="list-disc pl-5">
                          {report.patient_symptoms.map((symptom, index) => (
                            <li key={index} className="mb-2">
                              <span className="font-semibold">{symptom.name}</span>
                              <span className="ml-2">({symptom.is_gone ? 'Resolved' : 'Ongoing'})</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    {
                    /*<div>
                      <dt className="font-bold text-lg mb-2">Emotion Analysis</dt>
                      <dd>{report.emotion_analysis}</dd>
                    </div>*/
                    }
                    <div>
                      <dt className="font-bold text-lg mb-2">Predicted Disease (not shown usually)</dt>
                      <dd>{report.predicted_disease}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-lg mb-2">Full Transcription</dt>
                      <dd className="bg-gray-100 p-3 rounded-md max-h-40 overflow-y-auto">
                        {report.full_text}
                      </dd>
                    </div>
                  </dl>
                  {!isConfirmed && (
                    <div className="mt-6 flex justify-center">
                      <Button onClick={handleConfirm}>
                        Confirm and Submit Report
                      </Button>
                    </div>
                  )}
                  {isConfirmed && (
                    <p className="mt-6 text-center text-green-600 font-semibold">
                      Report confirmed and submitted successfully!
                    </p>
                  )}
                </>
              ) : isLoading ? (
                <div className="flex flex-col justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mb-4 m"></div>
                  <p className="text-center text-gray-600 mt-6">
                    Processing your audio. This may take a few moments...
                  </p>
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  Record and send your audio to generate a report.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
