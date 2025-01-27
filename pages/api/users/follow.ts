// File: pages/api/users/follow.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// 下記を使う場合は、実際に @prisma/client をインストール＆設定してください
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1) セッション取得
  const session = await getServerSession(req, res, authOptions);

  // 2) ログインチェック (session.user.idが存在するか)
  //  => next-auth.d.ts で型を拡張しているので、.id が型エラーにならない
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Not logged in" });
  }

  // 3) メソッドチェック
  if (req.method !== "POST") {
    return res.status(405).end(); // 405: Method Not Allowed
  }

  // 4) bodyから targetUserId を取得
  const { targetUserId } = req.body;
  if (!targetUserId) {
    return res.status(400).json({ error: "targetUserId is required" });
  }

  // 自分自身をフォローしようとした場合
  if (targetUserId === session.user.id) {
    return res.status(400).json({ error: "Cannot follow yourself" });
  }

  // 5) Prismaで既にフォローしているかチェック
  // (以下はDB接続がある場合のみ有効に)
  /*
  const exists = await prisma.follow.findFirst({
    where: {
      followerId: session.user.id,
      followingId: targetUserId,
    },
  });
  if (exists) {
    return res.status(400).json({ error: "Already following" });
  }

  const follow = await prisma.follow.create({
    data: {
      followerId: session.user.id,
      followingId: targetUserId,
    },
  });

  return res.status(200).json(follow);
  */

  // (テスト用のレスポンス)
  return res.status(200).json({
    message: `You are now following user: ${targetUserId}`,
    followerId: session.user.id,
  });
}
