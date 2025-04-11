/* eslint-disable @typescript-eslint/no-explicit-any */ // anyを一時的に許容する場合（推奨は型定義）
import type {
  NextAuthOptions,
  Session as NextAuthSession,
  User as NextAuthUser,
  Account,
  Profile,
} from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// PrismaClientのインスタンス化
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// グローバルスコープまたは現在のスコープでPrismaClientを初期化
const prisma = global.prisma || new PrismaClient();

// 開発環境でのみグローバルにPrismaClientを保持（ホットリロード対策）
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// NextAuth の型定義拡張 (セッションに id を追加するため)
// Note: この部分は通常 types/next-auth.d.ts に記述しますが、ここに記述しても機能します。
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null; // ユーザーIDを追加 (オプショナル)
    } & Omit<NextAuthUser, 'id'>; // デフォルトのUser型から 'id' を除外してマージ
    accessToken?: string | unknown;
    error?: string | unknown;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // DBユーザーID
    // role?: string; // 必要ならロールなども追加
    accessToken?: string | unknown;
    accessTokenExpires?: number; // ミリ秒単位のタイムスタンプ
    refreshToken?: string | unknown;
    error?: string | unknown;
  }
}
// --- 型定義拡張ここまで ---

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      // 環境変数が string | undefined 型なので、as string でキャストするか、
      // !! で boolean に変換してから string にするなどの処理が必要
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string, // 環境変数を string として扱う
  session: {
    strategy: "jwt", // JWT戦略を推奨
  },
  pages: {
    signIn: '/login', // ログインページのパス
    error: '/auth/error', // NextAuth関連のエラーページ
  },
  // .env ファイルの NEXTAUTH_DEBUG=true を反映
  debug: process.env.NEXTAUTH_DEBUG === 'true',
  callbacks: {
    // signIn コールバック (認証プロセス開始直後に実行)
    async signIn({ account, profile }: { account: Account | null; profile?: Profile }): Promise<boolean | string> {
      // profileが必須なプロバイダー(Googleなど)の場合、型ガードを行う
      if (account?.provider === "google" && profile) {
        console.log(`[Auth] Google Sign-In attempt for email: ${profile.email}`);
        // Googleアカウントの場合、メールアドレスが検証済みか確認
        if (!profile.email_verified) {
           console.warn(`[Auth] Google Sign-In denied: Email ${profile.email} is not verified.`);
           // エラーページにリダイレクトさせることも可能
           // return '/auth/error?error=EmailNotVerified';
           return false; // 認証を拒否
        }
        console.log(`[Auth] Google Sign-In successful for verified email: ${profile.email}`);
        return true; // 認証を許可
      }
      // 他のプロバイダーや、プロファイルがない場合は基本的に許可
      return true;
    },

    // jwt コールバック (JWTが作成・更新されるたびに実行)
    async jwt({ token, user, account }: { token: JWT; user?: AdapterUser | NextAuthUser; account?: Account | null }): Promise<JWT> {
      // console.log("[Auth] JWT Callback - Input:", { token: { sub: token.sub, id: token.id }, user: { id: user?.id }, account: { provider: account?.provider } });

      // 初回サインイン時 (userオブジェクトが存在する場合)
      // account 情報も存在する場合、プロバイダーからの情報を使ってトークンを初期化
      if (account && user) {
        console.log("[Auth] JWT Callback: Initial sign in. Populating token.");
        token.id = user.id; // AdapterUserまたはNextAuthUserのID (DBのユーザーID)
        token.accessToken = account.access_token;
        // expires_at は秒単位のUNIXタイムスタンプ。ミリ秒に変換して保存
        token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : undefined;
        token.refreshToken = account.refresh_token;
        // 必要なら他の情報 (例: role) も user オブジェクトから取得してトークンに追加
        // token.role = (user as any).role; // user オブジェクトに role があれば
      }

      // TODO: アクセストークンのリフレッシュ処理 (必要に応じて実装)
      // 有効期限が切れていたらリフレッシュトークンを使って新しいアクセストークンを取得する
      // if (token.accessTokenExpires && Date.now() >= token.accessTokenExpires) {
      //   console.log("[Auth] JWT Callback: Access token expired. Attempting refresh.");
      //   // return refreshAccessToken(token); // リフレッシュ処理を行う関数 (別途実装が必要)
      // }

      // console.log("[Auth] JWT Callback - Output:", { sub: token.sub, id: token.id, exp: token.accessTokenExpires ? new Date(token.accessTokenExpires) : 'N/A' });
      return token; // 更新されたトークンを返す
    },

    // session コールバック (セッションがアクセスされるたびに実行)
    async session({ session, token }: { session: NextAuthSession; token: JWT }): Promise<NextAuthSession> {
      // console.log("[Auth] Session Callback - Input:", { sessionUserEmail: session.user?.email, tokenId: token.id });

      // JWTトークンからセッションオブジェクトに必要な情報をコピー
      // 型拡張で session.user.id が利用可能になっている想定
      if (token && session.user) {
        session.user.id = token.id ?? null; // JWT の id をセッションの user.id に設定
        // クライアント側でアクセストークンが必要な場合は以下をアンコメント
        // session.accessToken = token.accessToken;
        // エラー情報をクライアントに渡したい場合は以下をアンコメント
        // session.error = token.error;
        // console.log(`[Auth] Session Callback: Added id (${session.user.id}) to session.`);
      } else {
        console.warn("[Auth] Session Callback: Token or session.user is missing. Cannot populate session user details.");
        // トークンや session.user がない場合、セッションユーザー情報をクリアするなどの処理
         session.user = undefined; // またはデフォルト値を設定
      }

      // console.log("[Auth] Session Callback - Output:", { sessionUserEmail: session.user?.email, sessionUserId: session.user?.id });
      return session; // 更新されたセッションオブジェクトを返す
    },
  },
  // エラー発生時のロギング
  events: {
    async signIn(message) { console.log("[Auth Event] signIn:", message); },
    async signOut(message) { console.log("[Auth Event] signOut:", message); },
    async createUser(message) { console.log("[Auth Event] createUser:", message); },
    async session(message) { console.log("[Auth Event] session:", message); },
    // エラーイベントを詳細にログ出力
    async error(message) { console.error("[Auth Event][ERROR]", message); }
  }
};

// NextAuth ハンドラーをエクスポート
export default NextAuth(authOptions);