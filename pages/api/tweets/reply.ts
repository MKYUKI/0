// pages/api/tweets/reply.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { tweetId, content } = req.body;
  if (!tweetId || !content) {
    return res.status(400).json({ message: "tweetId and content are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // ツイートが存在するかチェック
    const tweet = await prisma.tweet.findUnique({
      where: { id: tweetId }
    });
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    // コメント作成
    const reply = await prisma.reply.create({
      data: {
        content,
        tweetId: tweetId,
        userId: user.id
      }
    });

    return res.status(200).json(reply);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
