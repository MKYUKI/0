// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import SearchBar from '../components/SearchBar';
import Link from 'next/link';
import React from 'react';

// 共通ナビゲーションバー
function NavBar() {
  return (
    <header className="navbar" style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="nav-left">
        <Link href="/">Home</Link>
        <Link href="/aichat" style={{ marginLeft: '16px' }}>AI Chat</Link>
        <Link href="/art" style={{ marginLeft: '16px' }}>Art</Link>
        <Link href="/excelvba" style={{ marginLeft: '16px' }}>ExcelVBA</Link>
        <Link href="/contact" style={{ marginLeft: '16px' }}>Contact</Link>
      </div>
      <div className="nav-right">
        <SearchBar />
      </div>
    </header>
  );
}

// エラーバウンダリ
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
      return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  if (isLoginPage) {
    // ログインページのみは共通レイアウトを省く
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
