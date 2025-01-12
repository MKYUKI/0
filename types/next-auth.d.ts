// /types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // next-auth v4.22〜: AuthOptions
  interface User {
    id: string; // Credentialで返すid
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
