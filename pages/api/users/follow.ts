// pages/api/users/follow.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!currentUser) {
      return res.status(403).json({ message: "User not found" });
    }

    const { targetUserId } = req.body; // POST bodyにフォロー対象のユーザーIDを渡す
    if (!targetUserId) {
      return res.status(400).json({ message: "targetUserId is required" });
    }

    switch (req.method) {
      case "POST": {
        // フォロー
        // 既にフォローしているかを確認
        const existingFollow = await prisma.follow.findFirst({
          where: {
            followerId: currentUser.id,
            followingId: targetUserId
          }
        });
        if (existingFollow) {
          return res.status(200).json({ message: "Already following" });
        }

        const follow = await prisma.follow.create({
          data: {
            followerId: currentUser.id,
            followingId: targetUserId
          }
        });
        return res.status(200).json(follow);
      }
      case "DELETE": {
        // アンフォロー
        const deleted = await prisma.follow.deleteMany({
          where: {
            followerId: currentUser.id,
            followingId: targetUserId
          }
        });
        return res
          .status(200)
          .json({ message: "Unfollowed successfully", count: deleted.count });
      }
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
