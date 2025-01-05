// pages/api/tweets/[tweetId].ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { tweetId } = req.query;
  if (typeof tweetId !== "string") {
    return res.status(400).json({ message: "Invalid tweetId" });
  }

  try {
    switch (req.method) {
      case "GET": {
        const tweet = await prisma.tweet.findUnique({
          where: { id: tweetId },
          include: { user: true, likes: true, replies: { include: { user: true } } }
        });
        return res.status(200).json(tweet);
      }
      case "DELETE": {
        const tweet = await prisma.tweet.findUnique({ where: { id: tweetId } });
        if (!tweet) return res.status(404).json({ message: "Tweet not found" });

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user || user.id !== tweet.userId) {
          return res.status(403).json({ message: "Forbidden" });
        }
        await prisma.tweet.delete({ where: { id: tweetId } });
        return res.status(200).json({ message: "Tweet deleted" });
      }
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error("Error in tweets/[tweetId]:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
