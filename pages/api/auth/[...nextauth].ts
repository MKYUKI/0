// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions, Session as NextAuthSession, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

// PrismaClient のグローバル宣言とインスタンス共有（開発時はホットリロード対策）
declare global {
  var prisma: PrismaClient | undefined;
}
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// NextAuthの設定オプション
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),  // PrismaアダプターでDBと接続
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: { prompt: "consent", access_type: "offline", response_type: "code" }
      }
    }),
    // 他のプロバイダーを追加する場合はこの配列に追加
  ],

  // ※重要※ セッション管理とカスタムページ設定
  secret: process.env.NEXTAUTH_SECRET,       // 環境変数からシークレットを取得
  session: { strategy: "jwt" },              // セッションはJWTで管理（ミドルウェア対応のため）
  pages: {
    signIn: "/login",       // カスタムログインページ
    error: "/auth/error",   // エラーページ（必要に応じて実装）
    // signOut: '/logout',   // サインアウト後のリダイレクト先（必要なら）
    // verifyRequest: '/auth/verify-request', // メール確認用（必要なら）
    // newUser: '/welcome'   // 新規ユーザー登録後のページ（必要なら）
  },

  // 開発時のデバッグログ有効化
  debug: process.env.NODE_ENV === "development",

  // コールバック関数の定義（JWT内容のカスタマイズ）
  callbacks: {
    // サインイン時のチェック（Googleログイン時のみemail_verifiedを確認し許可）
    async signIn({ account, profile }): Promise<boolean> {
      if (account?.provider === "google") {
        console.log(`[Auth] Google Sign-In attempt for email: ${profile?.email}`);
        return profile?.email_verified ?? true;
      }
      return true; // 他のプロバイダーはそのまま許可
    },
    // JWT生成・更新のコールバック（初回ログイン時にユーザーID等をJWTに含める）
    async jwt({ token, user, account, profile }): Promise<JWT> {
      if (account && user) {
        // 初回ログイン時、tokenに必要な情報を付加
        token.id = user.id;
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : undefined;
        token.refreshToken = account.refresh_token;
        // DBから他の情報を取得して付加する例（コメントアウト）
        // const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        // if (dbUser) { token.role = dbUser.role; }
      }
      // ※必要に応じてアクセストークン期限切れ時の自動更新処理を実装できます
      return token;
    },
    // セッション取得のコールバック（JWTの内容をセッションに反映）
    async session({ session, token }): Promise<NextAuthSession> {
      if (token && session.user) {
        // JWT中のユーザーIDをセッションのユーザー情報に含める
        (session.user as any).id = token.id;
        // 必要に応じて他の情報も付加可能（例：session.user.role = token.role など）
      }
      return session;
    }
  },

  // （任意）イベントコールバックを追加可能。例：
  // events: {
  //   async signIn(message) { console.log("[Auth Event] signIn:", message) },
  //   async session(message) { console.log("[Auth Event] session:", message) },
  //   async error(message) { console.error("[Auth Event] error:", message) }
  // }
};

// NextAuthエンドポイントのエクスポート
export default NextAuth(authOptions);
