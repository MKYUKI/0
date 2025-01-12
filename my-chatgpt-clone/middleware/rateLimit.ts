// middleware/rateLimit.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { redisClient } from "../lib/redis";

const WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || "60", 10);
const MAX = parseInt(process.env.RATE_LIMIT_MAX || "100", 10);

export default async function rateLimit(req: NextApiRequest, res: NextApiResponse) {
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").toString();
  const key = `rate-limit:${ip}`;

  const usage = await redisClient.incr(key);
  if (usage === 1) {
    await redisClient.expire(key, WINDOW);
  }
  if (usage > MAX) {
    return res.status(429).json({ error: "Too many requests" });
  }
  // pass
}
