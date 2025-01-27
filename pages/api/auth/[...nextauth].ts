// File: pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 例: "test"/"pass"なら成功
        if (credentials?.username === "test" && credentials?.password === "pass") {
          return { id: "123", name: "TestUser" }
        }
        return null
      },
    }),
  ],
  // そのほか callbacks や session設定など
}

export default NextAuth(authOptions)
