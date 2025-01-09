// pages/api/tweets/[tweetId]/reply.ts
import type { NextApiRequest, NextApiResponse } from "next";
//import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  if(req.method!=='POST'){
    return res.status(405).end();
  }
  const session = await getServerSession(req,res,authOptions);
  if(!session){
    return res.status(401).json({ error:"Unauthorized" });
  }
  const { tweetId } = req.query;
  const { content } = req.body;
  if(!content?.trim()) return res.status(400).json({ error:"No content" });

  try{
   // const newReply = await prisma.reply.create({
   //   data:{
    //    content,
    //    tweetId: String(tweetId),
     //   userId: (session.user as any).id
    //  }
   // });
   // return res.json(newReply);
  } catch(e){
    console.error(e);
    return res.status(500).json({ error:"Internal Server Error" });
  }
}
