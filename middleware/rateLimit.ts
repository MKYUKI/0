// middleware/rateLimit.ts
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import redisClient from "../lib/redis";

const WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || "60", 10);
const MAX = parseInt(process.env.RATE_LIMIT_MAX || "100", 10);

export function rateLimit(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const identifier =
      (req.headers["x-forwarded-for"] as string) ||
      req.socket.remoteAddress ||
      "unknown_ip";

    const key = `rate_limit_${identifier}`;
    const currentCount = await redisClient.incr(key);

    if (currentCount === 1) {
      await redisClient.expire(key, WINDOW);
    }

    if (currentCount > MAX) {
      return res.status(429).json({
        message: `Rate limit exceeded. Max ${MAX} requests per ${WINDOW} seconds.`
      });
    }

    return handler(req, res);
  };
}
