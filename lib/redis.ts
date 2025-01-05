// lib/redis.ts
import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

export const redisClient = createClient({
  url: redisUrl,
});

// 例: イベント登録
redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// 接続開始 (あえて接続をawaitするなら別の箇所でやってもOK)
(async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Redis connected:", redisUrl);
    }
  } catch (error) {
    console.error("Redis connect error:", error);
  }
})();

export default redisClient;
