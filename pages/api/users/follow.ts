// File: pages/api/users/follow.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

// --- 最終回避策: カスタム型 or anyキャスト ---
// 例: カスタム型
type MySession = {
  user?: {
    id?: string
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1) セッション取得
  const session = await getServerSession(req, res, authOptions)

  // 2) MySessionにアサート
  const s = session as unknown as MySession
  if (!s.user?.id) {
    return res.status(401).json({ error: "Not logged in" })
  }

  if (req.method !== "POST") {
    return res.status(405).end()
  }

  // bodyから targetUserId
  const { targetUserId } = req.body
  if (!targetUserId) {
    return res.status(400).json({ error: "targetUserId is required" })
  }
  if (targetUserId === s.user.id) {
    return res.status(400).json({ error: "Cannot follow yourself" })
  }

  // ... DB操作 ...
  return res.status(200).json({ message: `Follow success: user ${s.user.id} -> ${targetUserId}` })
}
