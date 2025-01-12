// pages/api/ask.ts
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Mock endpoint
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { question } = req.body
    // Just echo it, referencing the 2017 Transformer
    const answer = `Mock response for "${question}". [Transformer(2017), MoE, NeRF, Diffusion references inside]`
    res.status(200).json({ answer })
  } catch (err) {
    console.error(err)
    res.status(500).json({ answer: '(Backend error occurred)' })
  }
}
