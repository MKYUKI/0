// File: types/next-auth.d.ts

import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      // デフォルトのプロパティ
      name?: string | null
      email?: string | null
      image?: string | null

      // ここで "id" を定義
      id: string
    }
  }

  // 必要に応じて "JWT" 型拡張や "User" 型にも id を定義可能
}
