// pages/api/ask.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "POST"){
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { prompt } = req.body;
  if(!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    // ChatCompletion
    const chatResp = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [ { role: "user", content: prompt } ]
    });
    const content = chatResp.choices[0]?.message?.content || "(no response)";
    return res.status(200).json({ content });
  } catch(err:any){
    console.error("OpenAI error:", err);
    return res.status(500).json({ error: err.message });
  }
}
