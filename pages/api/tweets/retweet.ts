// pages/api/tweets/retweet.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { tweetId } = req.body;
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

    // すでにリツイート済みかどうかをチェック
    const existingRetweet = await prisma.retweet.findFirst({
      where: {
        userId: user.id,
        tweetId: tweetId,
      },
    });
    if (existingRetweet) {
      // 既にリツイート済みであれば何もしない or エラー返すなど (好きに処理)
      return res.status(200).json({ message: "Already retweeted" });
    }

    // リツイートレコードを作成
    const retweet = await prisma.retweet.create({
      data: {
        userId: user.id,
        tweetId: tweetId,
      },
    });

    // 通知を作成 (通知を送る先＝ツイートの投稿者)
    const originalTweet = await prisma.tweet.findUnique({
      where: { id: tweetId },
    });
    if (originalTweet) {
      await prisma.notification.create({
        data: {
          message: `${user.name || user.email} retweeted your post`,
          userId: originalTweet.userId, // ツイート主宛
          type: "retweet",
          entityId: tweetId,
        },
      });
    }

    return res.status(200).json(retweet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
