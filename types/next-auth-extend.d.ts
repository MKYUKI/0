// File: types/next-auth-extend.d.ts

import { DefaultSession } from "next-auth"

// Session.user.id を追加する module augmentation
declare module "next-auth" {
  interface User {
    id?: string
  }
  interface Session {
    user?: {
      id?: string
    } & DefaultSession["user"]
  }
}
