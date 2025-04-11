// middleware.ts (新規作成)

import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

// `withAuth` を使用してミドルウェアをエクスポート

export default withAuth(
  // オプション: 認証済みの場合に追加の処理を実行するミドルウェア関数
  function middleware(req: NextRequest) {
    // console.log("[Middleware] Pathname:", req.nextUrl.pathname);
    // console.log("[Middleware] Token:", req.nextauth.token); // JWT戦略の場合、トークン内容を確認できる
    // 例: 特定のロールが必要なページへのアクセス制御
    // if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== 'admin') {
    //   return NextResponse.rewrite(new URL('/unauthorized', req.url));
    // }
    // 認証済みであれば、リクエストを続行
    return NextResponse.next();
  },
  // `withAuth` の設定オブジェクト
  {
    callbacks: {
      // `authorized` コールバックでアクセス許可を決定
      // JWT戦略の場合、`token` が存在するかどうかで判断するのが一般的
      authorized: ({ req, token }) => {
        // matcher に含まれるパスに対してのみ実行される
        const isAuthorized = !!token; // token が null でなければ true
        // console.log(`[Middleware] Path: ${req.nextUrl.pathname}, Authorized: ${isAuthorized}`);
        return isAuthorized;
      },
    },
    // 未認証時にリダイレクトされるページを指定 (authOptions.pages と一致させる)
    pages: {
      signIn: "/login",
      error: "/auth/error",
    },
  }
);

// ミドルウェアを適用するパスを指定する `config` オブジェクト

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|auth|images|js|docs|css).*)'
  ]
}
