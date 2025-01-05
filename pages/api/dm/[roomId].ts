// pages/api/dm/[roomId].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]"; 
// ↑ named exportとして "authOptions" をインポートできる

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // ...roomIdからDMデータ取得や処理を行う
  return res.status(200).json({ message: "OK" });
}
