// pages/api/ask.ts
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Minimal mock. In a real scenario, you might call an LLM or RAG pipeline, etc.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { question } = req.body;
    const answer = `This is a (mock) answer: You asked "${question}"! [Ref: "Attention Is All You Need" (2017)]`;
    res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: '(Backend error occurred)' });
  }
}
