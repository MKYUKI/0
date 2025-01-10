// pages/api/ask.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { question } = req.body
    // Simple mock
    const answer = `This is a mock. You asked: "${question}" (Ref: Transformers).`
    res.status(200).json({ answer })
  } catch (err) {
    console.error(err)
    res.status(500).json({ answer: '(Backend error occurred)' })
  }
}
