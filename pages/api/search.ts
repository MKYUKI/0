// pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  const { q, mode } = req.query;
  if (!q || typeof q !== "string") {
    return res.status(400).json({ message: "q is required" });
  }

  try {
    if (mode === "user") {
      // ユーザー検索
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } }
          ]
        }
      });
      return res.status(200).json({ type: "user", results: users });
    } else {
      // ツイート検索
      const tweets = await prisma.tweet.findMany({
        where: {
          content: { contains: q, mode: "insensitive" }
        },
        include: { user: true, likes: true, replies: true },
        orderBy: { createdAt: "desc" }
      });
      return res.status(200).json({ type: "tweet", results: tweets });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
