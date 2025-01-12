// pages/api/tweets/[tweetId].ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // (本来DB操作はprismaでやっていたが削除)
  // if (req.method === "PUT") {
  //   await prisma.tweet.update({ ... });
  //   return res.status(200).json({ message: "OK" });
  // }

  // 代わりにダミー処理
  if (req.method === "PUT") {
    return res.status(200).json({ message: "Dummy tweet update success (no DB)" });
  }

  return res.status(200).json({ message: "Dummy tweet endpoint" });
}
