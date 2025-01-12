// pages/api/ask.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { question } = req.body
    // ダミーでエコー
    const answer = `Mock response for: "${question}". [2017 Transformer, MoE, etc.]`
    res.status(200).json({ answer })
  } catch (err) {
    console.error(err)
    res.status(500).json({ answer: '(Error occurred)' })
  }
}
