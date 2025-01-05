// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  // 1) User に id を加える (string)
  interface User extends DefaultUser {
    id: string;
  }

  // 2) Session にカスタム User を持たせる
  interface Session {
    user: User;
  }

  // 3) token にも型を付ける
  interface JWT {
    // "unknown" ではなく string | undefined にしたい
    id?: string;  
  }
}
