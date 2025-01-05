import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user) {
          throw new Error("No user found with that email");
        }
        // ここで bcrypt 等でパスワード照合するのが本来
        // 例: const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)
        // if (!isValid) throw new Error('Incorrect password')

        // OKならユーザオブジェクトを返す
        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  pages: {
    signIn: "/api/auth/signin" // NextAuthのデフォルト画面でもOK
  }
};

export default NextAuth(authOptions);
