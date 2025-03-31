// pages/api/auth/[...nextauth].ts (修正案)
import NextAuth, { NextAuthOptions, Session as NextAuthSession, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, User as PrismaUser } from "@prisma/client"; // PrismaのUserをインポート
import { AdapterUser } from "next-auth/adapters"; // AdapterUserをインポート

declare global {
  var prisma: PrismaClient | undefined;
}
const prisma = global.prisma || new PrismaClient({
    // 必要であればログ設定を追加
    // log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
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
  // --- 必須: 環境変数からシークレットを読み込む ---
  secret: process.env.NEXTAUTH_SECRET,

  // --- セッション戦略 (Prisma Adapter 使用時は Database がデフォルトだが明示) ---
  // session: {
  //   strategy: "database", // または "jwt"
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  //   updateAge: 24 * 60 * 60, // 24 hours
  // },
  // JWT戦略にする場合は以下を有効化
   session: {
     strategy: "jwt",
   },

  // --- デバッグログ (開発時に有効化すると詳細なログが出る) ---
  debug: process.env.NODE_ENV === 'development',

  // --- カスタムページ ---
  pages: {
     signIn: '/login', // ログインページのパスを指定
     error: '/auth/error', // エラー発生時のページ (例: pages/auth/error.tsx を作成)
     // signOut: '/auth/signout',
     // verifyRequest: '/auth/verify-request',
     // newUser: null, // 新規ユーザー登録後にリダイレクトするページ (nullでデフォルト)
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { // 元の型定義
    async signIn({ account, profile }) { // よりシンプルな型定義例
      console.log("SignIn Callback - Account:", account);
      console.log("SignIn Callback - Profile:", profile);
      if (account?.provider === "google") {
        // Google プロバイダーの場合のチェック
        // 例えば、特定のドメインのメールアドレスのみ許可する場合など
        // if (profile?.email && profile.email.endsWith("@example.com")) {
        //   return true;
        // } else {
        //   console.log("SignIn Denied: Email domain not allowed.");
        //   return false; // またはリダイレクト '/unauthorized'
        // }
         // emailが検証済みか確認 (Googleは通常検証済み)
        // return profile?.email_verified ?? false;
         return true; // ここでは単純に許可
      }
      return true; // 他のプロバイダー（もしあれば）は許可
     try {
         // 必要ならここでユーザー情報を検証・加工する
         console.log("SignIn successful for user:", user); // user は Database Strategy では使えない場合がある
         return true;
     } catch (error) {
         console.error("SignIn callback error:", error);
         // エラー発生時は認証失敗とする
         return false; // 必ず boolean を返す
     }
    },

    // --- JWT ストラテジーを使用する場合に必要 ---
     async jwt({ token, user, account }) {
       console.log("JWT Callback - Token:", token);
       console.log("JWT Callback - User:", user); // 初回ログイン時のみDBのUser情報が入る
       console.log("JWT Callback - Account:", account); // 初回ログイン時のみProviderの情報が入る
       // 最初のサインイン時にユーザIDをトークンに含める
       if (account && user) {
         token.id = user.id; // DBのユーザーID
         token.accessToken = account.access_token; // Googleのアクセストークン (必要なら)
       }
       return token;
     },

    // --- Session コールバック ---
    // JWT / Database どちらのストラテジーでも呼ばれるが、引数が異なる
    // async session({ session, user, token }: { session: NextAuthSession; user: AdapterUser | PrismaUser; token: JWT }): Promise<NextAuthSession> { // 複合的な型定義
    // JWT戦略の場合: session, token が渡される
     async session({ session, token }: { session: NextAuthSession; token: JWT }): Promise<NextAuthSession> {
       console.log("Session Callback - Session (Before):", session);
       console.log("Session Callback - Token:", token);
       // JWTトークンからセッションにユーザーIDを追加
       if (token && session.user) {
         (session.user as any).id = token.id;
         // 必要なら他の情報もトークンからセッションに追加
         // (session.user as any).role = token.role; // 例: ロール情報
       }
       console.log("Session Callback - Session (After):", session);
       return session;
     },

    // Database戦略の場合: session, user が渡される (userはDBのユーザー情報)
    // async session({ session, user }: { session: NextAuthSession; user: AdapterUser | PrismaUser }): Promise<NextAuthSession> {
    //   console.log("Session Callback - Session (Before):", session);
    //   console.log("Session Callback - User (DB):", user);
    //   // DBのユーザー情報からセッションにユーザーIDを追加
    //   if (user && session.user) {
    //     (session.user as any).id = user.id;
    //   }
    //   console.log("Session Callback - Session (After):", session);
    //   return session;
    // },
  },

  // --- エラーハンドリング ---
  // events: {
  //   async signIn(message) { console.log("Event: signIn", message); },
  //   async signOut(message) { console.log("Event: signOut", message); },
  //   async createUser(message) { console.log("Event: createUser", message); },
  //   async updateUser(message) { console.log("Event: updateUser", message); },
  //   async linkAccount(message) { console.log("Event: linkAccount", message); },
  //   async session(message) { console.log("Event: session", message); },
  //   async error(message) { console.error("Event: error", message); }
  // }
};

// エラーハンドリングを追加したNextAuthインスタンス生成
export default async function auth(req: any, res: any) {
    try {
        // console.log("NextAuth API Route Request Headers:", req.headers);
        // console.log("NextAuth API Route Request Body:", req.body);
        return await NextAuth(req, res, authOptions);
    } catch (error) {
        console.error("NextAuth API Route Error:", error);
        res.status(500).json({ error: "Internal Server Error in NextAuth API Route" });
    }
}