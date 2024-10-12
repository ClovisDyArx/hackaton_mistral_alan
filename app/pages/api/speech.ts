import type { NextApiRequest, NextApiResponse } from "next";
import { SpeechToText } from "@google-cloud/speech";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("prout proput");
  console.log(req);
  const client = new SpeechToText();
  const buffer = audioBlob.stream();

  const request = {
    audio: {
      content: buffer,
    },
    config: {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US", // Adjust language code as needed
    },
  };

  client
    .recognize(request)
    .then((results) => {
      const transcription = results[0].results[0].alternatives[0].transcript;
      console.log("Transcription:", transcription);
    })
    .catch((err) => {
      console.error("Error recognizing audio:", err);
    });

  // setTranscript(result.transcription); // Set the received transcription

  res.status(200).json({});
}
