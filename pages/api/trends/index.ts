// pages/api/trends/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

/**
 * GET: トレンド一覧を返す
 * (本来はtweetやhashtagを集計してTrendItemを定期更新するなどの仕組みが必要)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // トレンドアイテムを count多い順に返す
    const trends = await prisma.trendItem.findMany({
      orderBy: { count: "desc" },
      take: 20, // 例: 上位20件まで
    });
    return res.status(200).json(trends);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
