// File: types/next-auth-hack.d.ts

declare module "next-auth" {
    /**
     * ハック: next-auth の default export が関数と認識されない時、
     * ここで強制的に "function NextAuth(...)" と型定義する。
     */
    export default function NextAuth(...args: any[]): any
  }
  