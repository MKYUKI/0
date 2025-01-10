// pages/api/ask.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { question } = req.body
    // Mock: just echo
    const answer = `Simulated response for: "${question}". [Ref: 2017 Transformer + MoE + NeRF + Diffusion]`
    res.status(200).json({ answer })
  } catch (err) {
    console.error(err)
    res.status(500).json({ answer: '(Backend error occurred)' })
  }
}
