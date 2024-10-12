import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();
  const uploadDir = path.join(process.cwd(), 'audio_recordings');

  // Ensure the directory exists
  fs.mkdirSync(uploadDir, { recursive: true });

  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Failed to upload audio' });
    }

    const file = files.audio;
    const filePath = path.join(uploadDir, file.newFilename);

    res.status(200).json({ filePath });
  });
}
