// pages/api/auth/[...nextauth].ts (修正後の完全版)
import NextAuth, { NextAuthOptions, Session as NextAuthSession, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt"; // JWT 型をインポート
// AdapterUserはJWT戦略では直接使わないことが多いが、型エラー防止のため残す場合も
import { AdapterUser } from "next-auth/adapters";

// PrismaClient のインスタンス化 (変更なし)
declare global {
  var prisma: PrismaClient | undefined;
}
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const authOptions: NextAuthOptions = { // 型を明示
  adapter: PrismaAdapter(prisma), // Prisma Adapter を使用
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: { // Google認証時のオプション (変更なし)
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // --- ▼▼▼【最重要修正箇所】▼▼▼ ---
  secret: process.env.NEXTAUTH_SECRET, // ★★★ 必須: 環境変数からシークレットを読み込む ★★★
  session: {
    strategy: "jwt", // ★★★ Middlewareとの連携のため "jwt" 戦略を強く推奨 ★★★
    // maxAge: 30 * 24 * 60 * 60, // Optional: セッションの有効期間 (デフォルトは30日)
    // updateAge: 24 * 60 * 60, // Optional: セッション更新期間 (デフォルトは24時間)
  },
  pages: {
    signIn: '/login',     // ★ 必須: カスタムログインページのパスを指定 ★
    error: '/auth/error', // ★ 推奨: 認証エラー時に表示するページのパス ★
    // signOut: '/logout', // Optional: サインアウト後のリダイレクト先
    // verifyRequest: '/auth/verify-request', // Optional: メール認証用
    // newUser: '/welcome' // Optional: 新規ユーザー登録後のリダイレクト先
  },
  // --- ▲▲▲【最重要修正箇所】▲▲▲ ---

  // --- デバッグログ (開発時に有効にすると便利) ---
  debug: process.env.NODE_ENV === 'development',

  // --- コールバック関数 (JWT戦略に合わせて修正) ---
  callbacks: {
    // signIn: Google認証なら基本的にtrueで問題ないことが多い
    async signIn({ account, profile }): Promise<boolean> { // 戻り値の型を指定
      if (account?.provider === "google") {
        // 必要であれば、ここで profile 情報 (メールアドレス等) を使って
        // ユーザーを検証したり、DBにカスタム情報を追加したりできる
        // 例: profile.email_verified が true であることを確認するなど
        console.log(`[Auth] Google Sign-In attempt for email: ${profile?.email}`);
        return profile?.email_verified ?? true; // email_verified があればそれを返し、なければ許可
      }
      // 他のプロバイダーを使う場合はここに追加
      return true;
    },

    // jwt: トークン生成・更新時に呼ばれる (JWT戦略では非常に重要)
    async jwt({ token, user, account, profile }): Promise<JWT> { // 戻り値の型を指定
      // console.log("[Auth] JWT Callback:", { token, user, account, profile });
      // 初回サインイン時 (account と user が存在する)
      if (account && user) {
        // トークンに含めたい情報を追加する
        token.id = user.id; // DB上のユーザーID (重要)
        token.accessToken = account.access_token; // Googleのアクセストークン (必要なら)
        token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : undefined; // トークン有効期限
        token.refreshToken = account.refresh_token; // リフレッシュトークン (必要なら)
        // DBのUserモデルから他の情報も追加可能
        // const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        // if (dbUser) { token.role = dbUser.role; } // 例: ユーザーロール
      }

      // // アクセストークンの有効期限チェックとリフレッシュ (高度な実装例)
      // if (token.accessTokenExpires && Date.now() >= token.accessTokenExpires && token.refreshToken) {
      //   console.log("[Auth] Access token expired, attempting refresh...");
      //   try {
      //     // GoogleのリフレッシュトークンAPIを叩く処理...
      //     // 新しいアクセストークン等を token にセットして返す
      //   } catch (error) {
      //     console.error("[Auth] Error refreshing access token", error);
      //     // エラー時は既存のトークンを返すか、エラーを示す値を設定
      //     token.error = "RefreshAccessTokenError";
      //   }
      // }

      return token; // 必ずトークンオブジェクトを返す
    },

    // session: セッションアクセス時に呼ばれる (クライアントに返す情報を整形)
    async session({ session, token }): Promise<NextAuthSession> { // 戻り値の型を指定
      // console.log("[Auth] Session Callback:", { session, token });
      // JWTトークンからセッションオブジェクトに情報をコピー
      if (token && session.user) {
        (session.user as any).id = token.id; // ユーザーIDをセッションに追加 (重要)
        // JWTに追加した他の情報もセッションに追加可能
        // (session.user as any).role = token.role;
        // セッションにアクセストークンを含めるかはセキュリティリスクを考慮する
        // (session as any).accessToken = token.accessToken; // 含める場合の例
        // (session as any).error = token.error; // トークンリフレッシュエラーなど
      }
      return session; // 必ずセッションオブジェクトを返す
    },
  },

  // --- イベント (デバッグやロギングに利用可能) ---
  // events: {
  //   async signIn(message) { console.log("[Auth Event] signIn:", message) },
  //   async session(message) { console.log("[Auth Event] session:", message) },
  //   async error(message) { console.error("[Auth Event] error:", message) }
  // }
};

// NextAuth ハンドラをエクスポート
export default NextAuth(authOptions);