// File: types/next-auth.d.ts

import { DefaultSession } from "next-auth"

declare module "next-auth" {
  // Session の型拡張
  interface Session {
    user?: {
      /** デフォルトの name, email, image などのプロパティを含めるなら… */
      name?: string | null
      email?: string | null
      image?: string | null

      /** ここに id を追加 */
      id: string
    }
  }
}
