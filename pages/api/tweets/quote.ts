// pages/api/tweets/quote.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // セッションチェック
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // メソッド確認
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  // 送信データ
  const { tweetId, comment } = req.body;
  if (!tweetId) {
    return res.status(400).json({ message: "tweetId is required" });
  }

  // 例: Prismaを呼び出していた箇所は削除/コメントアウト
  // import prisma from "../../../lib/prisma";
  // const created = await prisma.quote.create({
  //   data: { tweetId, comment, userId: (session.user as any).id }
  // });

  // ここでは単純に成功メッセージのみを返す例
  return res.status(200).json({
    message: "POST /api/tweets/quote success",
    // created
  });
}
