// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` の第一引数はミドルウェア関数 (オプション)
  function middleware(req) {
    // console.log("Middleware called for:", req.nextUrl.pathname);
    // console.log("Token in middleware:", req.nextauth.token); // JWT戦略の場合

    // 特定のパスに対する追加のロジックが必要な場合はここに記述
    // 例: 管理者ページへのアクセス制御
    // if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== 'admin') {
    //   return NextResponse.rewrite(new URL('/unauthorized', req.url)); // 別ページに書き換え
    // }

    // 通常は認証済みであればそのまま通過させる
    return NextResponse.next();
  },
  // `withAuth` の第二引数は設定オブジェクト
  {
    callbacks: {
      // `authorized` コールバックで認証状態を判断
      authorized: ({ req, token }) => {
        // `/api/auth` へのリクエストは常に許可 (NextAuth自体が使う)
        // Public な静的ファイルや画像なども除外対象に含める (下の config.matcher で対応推奨)
        // if (req.nextUrl.pathname.startsWith('/api/auth')) {
        //     return true;
        // }

        // ログインページ自体は認証不要（のはずだが念のため）
        // if (req.nextUrl.pathname === '/login') return true;


        // JWT戦略の場合: token が存在すれば認証済み
        // Database戦略の場合: ここでは token は常に null になる可能性が高い
        // そのため、withAuth は主にJWT戦略と組み合わせるのが簡単
        // Database戦略でMiddlewareを使う場合は、APIルートを叩いてセッションを確認するなどの工夫が必要になる場合がある
        // → JWT戦略への変更を検討する価値あり
        if (token) {
             console.log("Middleware: Authorized (token exists)");
             return true; // トークンがあれば許可
        } else {
             console.log("Middleware: Unauthorized (token missing)");
             return false; // トークンがなければ拒否 (ログインページへリダイレクト)
        }
      },
    },
    // 認証が必要だが未認証の場合のリダイレクト先
    pages: {
      signIn: "/login", // ログインページのパス
      error: "/auth/error", // エラーページのパス
    },
  }
);

// ミドルウェアを適用するパスのパターンを指定
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (the login page itself)
     * - auth/error (the error page)
     * - /images, /js, /docs (public assets)
     * - Add any other public paths here
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|auth/error|images|js|docs).*)',
    '/', // ルートパスも保護対象に含める
  ],
};