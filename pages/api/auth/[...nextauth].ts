// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    // 例: GoogleProvider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // 例: credentials
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if(!creds?.email || !creds?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: creds.email }
        });
        if(!user) return null;

        // bcrypt check
        const valid = await bcrypt.compare(creds.password, user.hashedPassword || "");
        if(!valid) return null;

        return { id: user.id, email: user.email, name: user.name };
      }
    })
  ],
  // 例: Session
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "secretkey",
};

export default NextAuth(authOptions);
