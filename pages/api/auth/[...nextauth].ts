// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";

// ホットリロード対策：グローバルに PrismaClient インスタンスを保持
declare global {
  var prisma: PrismaClient | undefined;
}
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

interface SignInCallbackParams {
  user: any;
  account: any;
  profile?: any;
  email?: string;
  credentials?: any;
}

interface SessionCallbackParams {
  session: Session;
  user: any;
  token: any;
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile, email, user, credentials }: SignInCallbackParams): Promise<boolean> {
      // 初回ログイン時の追加処理をここに記述可能
      console.log("Sign in callback:", { account, profile, email, user, credentials });
      return true;
    },
    async session({ session, user, token }: SessionCallbackParams): Promise<Session> {
      // セッションにユーザーIDを追加
      (session.user as any).id = user.id;
      console.log("Session callback:", { session, user, token });
      return session;
    },
  },
};

export default NextAuth(authOptions);