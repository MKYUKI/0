// File: pages/api/whatever.ts
import type { NextApiRequest, NextApiResponse } from "next"
// ★ default import
import getServerSession from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

// POST /api/whatever
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // next-auth で sessionを取得
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: "Not logged in" })
  }

  // ...
  return res.status(200).json({ message: "Success", session })
}
