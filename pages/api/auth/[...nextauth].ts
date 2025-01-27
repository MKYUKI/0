// File: pages/auth/[...nextauth].ts (例)

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// あるいは GitHub, Google など

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // ...
        // userオブジェクトを返すとログイン成功 => tokenに格納される
        return { id: "12345", name: "test user" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // ログイン成功時に user.id があれば token に載せる
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // セッションに token.id をコピー
      if (token?.id) {
        session.user = session.user || {};
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
