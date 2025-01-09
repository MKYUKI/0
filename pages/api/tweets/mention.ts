// pages/api/tweets/mention.ts

import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma"; // ← 使わないならコメントアウト

// メンションパターン: @ + アルファベット数字_ にマッチ (例: @John123)
const mentionRegex = /@([a-zA-Z0-9_]+)/g;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // メソッドをチェック
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // content を取得
  const { content } = req.body;
  if (!content || typeof content !== "string") {
    return res.status(400).json({ message: "Invalid content" });
  }

  // メンション抽出
  const matches = [...content.matchAll(mentionRegex)];
  // group1 部分(@foo の "foo")を取得
  const mentionedUsernames = matches.map((m) => m[1]);

  // 重複除去
  const uniqueUsernames = Array.from(new Set(mentionedUsernames));

  // メンション0件なら何もしない
  if (uniqueUsernames.length === 0) {
    return res.status(200).json({ message: "No mentions found" });
  }

  // ===== ここから先はコメントアウト (Prisma使わないなら削除でもOK) =====
  /*
  // const usersToNotify = await prisma.user.findMany({
  //   where: {
  //     username: { in: uniqueUsernames },
  //   },
  // });

  // for (const user of usersToNotify) {
  //   await prisma.notification.create({
  //     data: {
  //       message: `You were mentioned: "${content.slice(0, 50)}..."`,
  //       userId: user.id,
  //     },
  //   });
  // }

  // return res.status(200).json({
  //   message: "Mention handled successfully",
  //   notifiedUserCount: usersToNotify.length,
  // });
  */

  // とりあえず、メンションされたユーザー一覧だけ返す
  return res.status(200).json({
    message: "Mention handled successfully (dummy)",
    mentioned: uniqueUsernames,
  });
}
