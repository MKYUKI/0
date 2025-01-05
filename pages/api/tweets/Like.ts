// pages/api/tweets/like.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { tweetId } = req.body; // POSTに含まれるtweetId
  if (!tweetId) {
    return res.status(400).json({ message: "tweetId is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    if (req.method === "POST") {
      // いいね追加 (既に押している場合は何もしないでも良い)
      const existingLike = await prisma.like.findFirst({
        where: {
          tweetId,
          userId: user.id
        }
      });
      if (existingLike) {
        // 既にいいねしているなら特に何もしない
        return res.status(200).json({ message: "Already liked" });
      }

      const like = await prisma.like.create({
        data: {
          tweetId,
          userId: user.id
        }
      });
      return res.status(200).json(like);
    }

    if (req.method === "DELETE") {
      // いいね取り消し
      const deleted = await prisma.like.deleteMany({
        where: {
          tweetId,
          userId: user.id
        }
      });
      return res.status(200).json({ message: "Like removed", count: deleted.count });
    }

    return res.status(405).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
