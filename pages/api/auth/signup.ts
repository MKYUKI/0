import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Prisma でユーザ作成
  const newUser = await prisma.user.create({
    data: {
      email,
      name
      // hashedPassword: await bcrypt.hash(password, 10), etc..
    }
  });

  return res.status(200).json({ user: newUser });
}
