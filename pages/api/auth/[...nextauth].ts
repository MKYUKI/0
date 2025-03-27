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

// コールバックパラメータの型定義 (必要に応じて詳細化)
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
      // 追加設定: 認証フローのタイプを明示的に指定 (念のため)
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code" // 念のため code を明示
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ account, profile, email, user, credentials }: SignInCallbackParams): Promise<boolean> {
      // 初回ログイン時の追加処理 (必要に応じて記述)
      console.log("signIn callback", { account, profile, email, user, credentials }); // デバッグログ追加
      return true;
    },
    async session({ session, user, token }: SessionCallbackParams): Promise<Session> {
      // セッションにユーザーIDを追加
      (session.user as any).id = user.id;
      console.log("session callback", { session, user, token }); // デバッグログ追加
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect callback", { url, baseUrl }); // リダイレクトURLのデバッグログ
      return url
    },
  },
  // pages: { // デフォルトのサインインページ以外を使用する場合に設定
  //   signIn: '/login',
  //   error: '/api/auth/error', // エラーページを指定 (必要に応じて)
  // },
  debug: true, // デバッグログを有効にする (問題解決に役立つ)
  session: {
    strategy: "jwt", // JWT ストラテジーを明示的に指定 (デフォルトですが明示的に)
    maxAge: 30 * 24 * 60 * 60, // セッションの最大寿命 (30日) - 必要に応じて調整
    updateAge: 24 * 60 * 60, // セッションを更新する間隔 (24時間) - 必要に応じて調整
  },
  // エラー処理を強化 (必要に応じて)
  events: {
    async error(message) {
      console.error("AUTH ERROR EVENT:", message); // エラーイベントログ
    }
  }
};

export default NextAuth(authOptions);
