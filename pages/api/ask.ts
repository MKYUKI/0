import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { question } = req.body;
    // Just echo it for now:
    const answer = `Simulated response for: "${question}". [Quantum fractals, 2017 Transformer references inside.]`;
    res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: '(Backend error occurred)' });
  }
}
