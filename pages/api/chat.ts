// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { model, messages } = req.body
    const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model || 'gpt-4',
        messages
      })
    })
    const data = await openAiRes.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('Error in /api/chat:', error)
    return res.status(500).json({ error: 'Server error' })
  }
}
