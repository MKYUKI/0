// pages/api/tweets/mention.ts

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// メンションパターン: @ + アルファベット数字_ にマッチ (例: @John123)
const mentionRegex = /@([a-zA-Z0-9_]+)/g;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { content } = req.body;
    if (!content || typeof content !== "string") {
      return res.status(400).json({ message: "Invalid content" });
    }

    // メンション抽出
    // ここで matchAll が使われる => target: "es2015" or downlevelIteration = true が必要
    const matches = [...content.matchAll(mentionRegex)];
    // group1 部分 (@foo の "foo") を取得
    const mentionedUsernames = matches.map((m) => m[1]);

    // 重複除去
    const uniqueUsernames = Array.from(new Set(mentionedUsernames));

    if (uniqueUsernames.length === 0) {
      return res.status(200).json({ message: "No mentions found" });
    }

    // Userテーブルに username が無ければスキーマに追加 (上記 schema.prisma を参照)
    // username: { in: [...] } で検索
    const usersToNotify = await prisma.user.findMany({
      where: {
        username: { in: uniqueUsernames },
      },
    });

    // 例: Notificationを作成 (Notification.userId, message)
    for (const user of usersToNotify) {
      await prisma.notification.create({
        data: {
          message: `You were mentioned: "${content.slice(0, 50)}..."`,
          userId: user.id,
        },
      });
    }

    return res.status(200).json({
      message: "Mention handled successfully",
      notifiedUserCount: usersToNotify.length,
    });
  } catch (error) {
    console.error("mention.ts error:", error);
    return res.status(500).json({ message: "Server Error", error: String(error) });
  }
}
