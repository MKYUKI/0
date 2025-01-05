// pages/api/dm/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

/**
 * GET: ログインユーザーが参加しているチャットルーム一覧を取得
 * POST: 新規チャットルームを作成 (DM開始)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return res.status(403).json({ message: "User not found" });
  }

  try {
    switch (req.method) {
      case "GET": {
        // 参加しているチャットルーム一覧
        const rooms = await prisma.chatRoom.findMany({
          where: {
            participants: {
              some: { id: user.id },
            },
          },
          include: {
            participants: true,
          },
        });
        return res.status(200).json(rooms);
      }
      case "POST": {
        const { participantIds } = req.body;
        if (!participantIds || !Array.isArray(participantIds)) {
          return res.status(400).json({ message: "participantIds is required (array)" });
        }

        // 自分を含めたparticipants配列
        const uniqueIds = Array.from(new Set([...participantIds, user.id]));

        // 新規チャットルーム作成
        const newRoom = await prisma.chatRoom.create({
          data: {
            participants: {
              connect: uniqueIds.map((uid) => ({ id: uid })),
            },
          },
          include: {
            participants: true,
          },
        });
        return res.status(201).json(newRoom);
      }
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
