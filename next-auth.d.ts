// /types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

// 1. next-auth モジュールへの型拡張
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ← ここを追加
    } & DefaultSession["user"];
  }
}
