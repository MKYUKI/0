/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import type { Session as NextAuthSession, User as NextAuthUser, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { JWT } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";

// 独自のアカウント型を定義（NextAuth v4 では Account 型の名前付きエクスポートは行われないため）
interface MyAccount {
  provider: string;
  providerAccountId: string;
  type: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  oauth_token_secret?: string;
  oauth_token?: string;
}

// PrismaClient のインスタンス化（ホットリロード対策）
declare global {
  var prisma: PrismaClient | undefined;
}
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// NextAuth の型定義の拡張（型定義をグローバルに拡張する場合も可能）
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null;
    } & NextAuthUser;
    accessToken?: string | unknown;
    error?: string | unknown;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string | unknown;
    accessTokenExpires?: number;
    refreshToken?: string | unknown;
    error?: string | unknown;
  }
}

// NextAuthOptions の型はエクスポートされなくなったため、NextAuth 関数の第一引数の型から推論する
type NextAuthOptionsType = Parameters<typeof NextAuth>[0];

export const authOptions: NextAuthOptionsType = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async signIn({ account, profile }: { account: MyAccount | null; profile?: Profile }): Promise<boolean> {
      if (account?.provider === "google") {
        console.log(`[Auth] Google Sign-In attempt for email: ${profile?.email}`);
        // Google の場合、email_verified をチェック
        return !!profile?.email_verified;
      }
      return true;
    },
    async jwt({ token, user, account }: { token: JWT; user?: AdapterUser | NextAuthUser; account?: MyAccount | null }): Promise<JWT> {
      if (account && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : undefined;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }: { session: NextAuthSession; token: JWT }): Promise<NextAuthSession> {
      if (token && session.user) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
  events: {
    async signIn(message) {
      console.log("[Auth Event] signIn:", message);
    },
    async signOut(message) {
      console.log("[Auth Event] signOut:", message);
    },
    async createUser(message) {
      console.log("[Auth Event] createUser:", message);
    },
    async session(message) {
      console.log("[Auth Event] session:", message);
    },
    async error(message) {
      console.error("[Auth Event][ERROR]", message);
    },
  },
};

export default NextAuth(authOptions);
