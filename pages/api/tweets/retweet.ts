// pages/api/tweets/retweet.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// import prisma from "../../../lib/prisma";  // ← これをコメントアウト/削除

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  // ... ここで prisma.retweets.create(...) していたらコメントアウト
  // const newRetweet = await prisma.retweet.create({
  //   data: {...}
  // });

  // Prisma呼び出しを削除したので、代わりにダミーの成功レスを返す:
  return res.json({ message: "POST /api/tweets/retweet success" });
}
