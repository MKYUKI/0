// lib/redis.ts
import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
export const redisClient = createClient({ url: redisUrl });

// optional: connect on module load
redisClient.connect().catch((err) => {
  console.error("Redis connect error:", err);
});
