import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
//import { PrismaClient } from "@prisma/client";

//const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Not logged in" });
  }
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { targetUserId } = req.body;
  if (!targetUserId) {
    return res.status(400).json({ error: "targetUserId is required" });
  }
  if (targetUserId === session.user.id) {
    return res.status(400).json({ error: "Cannot follow yourself" });
  }

  //const exists = await prisma.follow.findFirst({
   // where: {
    //  followerId: session.user.id,
   //   followingId: targetUserId,
 //   },
 // });
 // if (exists) {
 //   return res.status(400).json({ error: "Already following" });
  }
 // const follow = await prisma.follow.create({
  //  data: {
   //   followerId: session.user.id,
  //    followingId: targetUserId,
   // },
 // });
 // return res.status(200).json(follow);
  //}
