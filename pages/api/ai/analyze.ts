// pages/api/ai/analyze.ts (Next.jsのAPI Route例)
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";  // v4 ではこう書く

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Hello from openai 4.x" },
      ],
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
