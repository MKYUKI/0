// pages/_app.tsx
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';
import SearchBar from '../components/SearchBar';

function NavBar() {
  return (
    <header
      className="navbar"
      style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="nav-left">
        <Link href="/">
          <a className="nav-link" style={{ marginRight: '16px' }}>Home</a>
        </Link>
        <Link href="/aichat">
          <a className="nav-link" style={{ marginRight: '16px' }}>AI Chat</a>
        </Link>
        <Link href="/art">
          <a className="nav-link" style={{ marginRight: '16px' }}>Art</a>
        </Link>
        <Link href="/excelvba">
          <a className="nav-link" style={{ marginRight: '16px' }}>ExcelVBA</a>
        </Link>
        <Link href="/contact">
          <a className="nav-link" style={{ marginRight: '16px' }}>Contact</a>
        </Link>
      </div>
      <div className="nav-right">
        <SearchBar />
        {/* 必要に応じて認証ボタンなど追加 */}
      </div>
    </header>
  );
}

// エラーバウンダリ（エラー発生時にフォールバック表示）
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
          <h1>Something went wrong.</h1>
          <p>Please reload the page or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    console.log('[MyApp] mounted on client side.');
  }, []);

  // /login ページの場合は共通レイアウトを除外
  const isLoginPage = router.asPath.startsWith('/login');

  if (isLoginPage) {
    return (
      <SessionProvider session={session}>
        <ErrorBoundary>
          <Head>
            <title>Cosmic Portal - Login</title>
            <meta name="description" content="Log in with Google to enter the Cosmic Portal." />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <Component {...pageProps} />
        </ErrorBoundary>
      </SessionProvider>
    );
  }

  // 共通レイアウトを使用する場合
  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <Head>
          <title>Cosmic Portal</title>
          <meta name="description" content="A cosmic portal website." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <div id="app-wrapper" style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
          <NavBar />
          <main id="main-content" style={{ padding: '20px' }}>
            <Component {...pageProps} />
          </main>
          <footer id="main-footer" style={{ marginTop: '20px', padding: '10px', background: '#111', textAlign: 'center' }}>
            <p>&copy; {new Date().getFullYear()} Masaki Kusaka. All rights reserved.</p>
          </footer>
        </div>
      </ErrorBoundary>
    </SessionProvider>
  );
}
