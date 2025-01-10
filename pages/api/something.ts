// pages/api/something.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { name, email } = req.body
      const user = await prisma.user.create({
        data: { name, email },
      })
      return res.status(200).json(user)
    }
    return res.status(405).json({ error: 'Method not allowed' })
  } catch(e) {
    console.error(e)
    return res.status(500).json({ error: 'Server error' })
  }
}
