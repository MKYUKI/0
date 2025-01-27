// File: pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // ... 認証ロジック ...
        // 成功時 => userオブジェクト返却
        return { id: "12345", name: "TestUser" }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // userが存在するなら tokenにidを保存
      if (user?.id) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // token.id を session.user.id にコピー
      if (token?.id) {
        session.user = session.user || {}
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
}

export default NextAuth(authOptions)
