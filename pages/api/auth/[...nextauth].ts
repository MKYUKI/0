// File: pages/api/auth/[...nextauth].ts

import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// 例: GitHub, Googleなどを使う場合
// import GitHubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // ユーザー認証ロジック（例）
        // ここでDB照合等を行い、失敗なら null, 成功なら userオブジェクトを返す
        // userには "id" を含める: { id, name, ... }

        if (!credentials?.username || !credentials.password) {
          return null
        }
        // 仮の認証例: ユーザーが "test" / "pass" ならOK
        if (
          credentials.username === "test" &&
          credentials.password === "pass"
        ) {
          // IDを含むユーザーオブジェクトを返す
          return { id: "12345", name: "Test User" }
        }
        // 認証失敗
        return null
      },
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID || "",
    //   clientSecret: process.env.GITHUB_SECRET || "",
    // }),
  ],
  // JWT/Sessionコールバック
  callbacks: {
    async jwt({ token, user }) {
      // ログイン成功時(userが存在する時)に token.id をセット
      if (user?.id) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // token.id を session.user.id にコピー
      if (token?.id) {
        session.user = session.user || {}
        // <= ここで '=' が抜けていた可能性がある
        //    正しくは session.user.id = token.id as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  // optional
  session: {
    strategy: "jwt",
  },
  // 必要に応じてsecretなど
  secret: process.env.NEXTAUTH_SECRET,
}

// NextAuth実行
export default NextAuth(authOptions)
