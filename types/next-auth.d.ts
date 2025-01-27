// File: types/next-auth.d.ts

import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      // デフォルトの name/email/image
      name?: string | null
      email?: string | null
      image?: string | null

      // カスタム: id
      id: string
    }
  }
}
