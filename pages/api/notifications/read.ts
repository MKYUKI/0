// pages/api/notifications/read.ts
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

  const { notificationId } = req.body;
  if (!notificationId) {
    return res.status(400).json({ message: "notificationId is required" });
  }

  try {
    // 既読フラグ更新
    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });

    return res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
