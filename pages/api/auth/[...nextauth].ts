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

// コールバックパラメータの型定義
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
  // NEXTAUTH_SECRET を環境変数から読み込む
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // 認証時に必ずアカウント選択画面を表示する設定
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: SignInCallbackParams): Promise<boolean> {
      try {
        // ここで追加のユーザー検証が必要なら実施
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
    async session({ session, user, token }: SessionCallbackParams): Promise<Session> {
      // セッションにユーザーIDを追加
      (session.user as any).id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
