// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // ここで prisma.user.findMany() を使ってユーザー一覧を取得していたが、
    // prisma が存在しないためコメントアウトする
    //
    // const users = await prisma.user.findMany({
    //   include: {
    //     followers: true,
    //     following: true
    //   }
    // });
    //
    // return res.status(200).json(users);

    // prisma がないなら、とりあえずダミーで返しておく:
    return res.status(200).json({ message: "No prisma usage; returning dummy data." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
