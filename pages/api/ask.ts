// pages/api/ask.ts
//import type { NextApiRequest, NextApiResponse } from "next";
// ❌ こうではなく   import { Configuration, OpenAIApi } from "openai";
// ✅ 新しい openai の v4 では
//import OpenAI from "openai";

//const openai = new OpenAI({
  //apiKey: process.env.OPENAI_API_KEY || "", 
  // (必要に応じて other options: e.g. baseURL)
//});

//export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 // try {
 //   // 例として、ユーザの prompt を POSTデータから受け取る
 //   if (req.method !== "POST") {
 //     return res.status(405).json({ error: "Method not allowed" });
 //   }
 //  const userPrompt = req.body?.prompt || "Hello from openai v4 library!";
//
 //   // chat.completions.create(...) が新しい呼び出し方
 //   const completion = await openai.chat.completions.create({
  //    model: "gpt-3.5-turbo",
 //     messages: [{ role: "user", content: userPrompt }],
 //   });
//
 //   // completion は { id, object, created, model, choices, usage... } など
 //   return res.status(200).json({ data: completion });
//  } catch (err: any) {
//    console.error("OpenAI error:", err);
//    return res.status(500).json({ error: err.message || "Something went wrong" });
//  }
//}
