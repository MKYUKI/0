// pages/api/tweets/quote.ts
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

  const { tweetId, comment } = req.body;
  if (!tweetId) {
    return res.status(400).json({ message: "tweetId is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // 元ツイート存在確認
    const original = await prisma.tweet.findUnique({
      where: { id: tweetId },
    });
    if (!original) {
      return res.status(404).json({ message: "Original tweet not found" });
    }

    // QuoteRetweet作成
    const quote = await prisma.quoteRetweet.create({
      data: {
        userId: user.id,
        originalId: tweetId,
        content: comment || "",
      },
    });

    // 必要に応じて通知作成 etc.
    await prisma.notification.create({
      data: {
        message: `${user.name || user.email} quoted your tweet`,
        userId: original.userId,
        type: "retweet",
        entityId: tweetId,
      },
    });

    return res.status(200).json(quote);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
