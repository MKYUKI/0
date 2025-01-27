// File: pages/api/tweets/mention.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function mentionHandler(req: NextApiRequest, res: NextApiResponse) {
  const { content } = req.body
  if (typeof content !== 'string') {
    return res.status(400).json({ error: 'No content found' })
  }

  // mentionRegex => @xxxx
  const mentionRegex = /@(\w+)/g

  // Option A: use matchAll with downlevelIteration
  // const matches = [...content.matchAll(mentionRegex)]
  // const mentionedUsernames = matches.map(m => m[1])

  // Option B: fallback approach
  const mentionedUsernames: string[] = []
  let m
  while ((m = mentionRegex.exec(content)) !== null) {
    mentionedUsernames.push(m[1])
  }

  return res.json({
    status: 'ok',
    mentionedUsernames,
  })
}
