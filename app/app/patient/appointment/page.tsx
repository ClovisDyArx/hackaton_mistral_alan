import AudioRecorder from '@/app/components/AudioRecorder';

export default function Appointment() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Voice Recorder</h1>
      <AudioRecorder />
    </main>
  );
}
