// pages/api/tweets/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// import { rateLimit } from "../../../middleware/rateLimit";
// export default rateLimit(async function handler(req, res) {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    switch (req.method) {
      case "POST": {
        const { content, imageUrl } = req.body;
        const user = await prisma.user.findUnique({
          where: { email: session.user.email }
        });
        if (!user) {
          return res.status(403).json({ message: "User not found" });
        }
        const tweet = await prisma.tweet.create({
          data: {
            content,
            imageUrl,
            userId: user.id
          }
        });
        return res.status(200).json(tweet);
      }
      case "GET": {
        const tweets = await prisma.tweet.findMany({
          orderBy: { createdAt: "desc" },
          include: {
            user: true,
            likes: true,
            replies: { include: { user: true } }
          }
        });
        return res.status(200).json(tweets);
      }
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error("Error in tweets/index:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
