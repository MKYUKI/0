// types/next-auth.d.ts
declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      // "id"を必須ではなくオプションに
      id?: string
    }
  }
}
