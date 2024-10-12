import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { audioPath, language } = req.body;

  try {
    const response = await fetch('http://localhost:5000/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audio: audioPath, language }),
    });

    if (response.ok) {
      const { text } = await response.json();
      res.status(200).json({ transcript: text });
    } else {
      res.status(500).json({ error: 'Failed to fetch transcript from Python backend' });
    }
  } catch (error) {
    console.error('Error calling Python function:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
