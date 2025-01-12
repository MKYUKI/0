// pages/api/tweets/reply.ts

// ========== 認証関連コメントアウト ==========
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../auth/[...nextauth]";

// Next.jsのAPIルート用型をimport
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ========== 認証呼び出し部分もコメントアウト ==========
  // const session = await getServerSession(req, res, authOptions);
  // if (!session) {
  //   return res.status(401).json({ error: "Not logged in" });
  // }

  // 仮のレスポンス(認証機能無効化中なので誰でもOK)
  return res.status(200).json({
    message: "Auth is temporarily disabled. No errors should occur now.",
  });
}
