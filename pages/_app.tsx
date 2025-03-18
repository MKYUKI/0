import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SessionProvider } from "next-auth/react"; // 追加

import '../styles/globals.css';
import SearchBar from '../components/SearchBar';

function NavBar() {
  return (
    <header className="navbar" style={{
      backgroundColor: '#000',
      color: '#fff',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div className="nav-left">
        <Link href="/" className="nav-link" style={{ marginRight: '16px' }}>Home</Link>
        <Link href="/aichat" className="nav-link" style={{ marginRight: '16px' }}>AI Chat</Link>
        <Link href="/art" className="nav-link" style={{ marginRight: '16px' }}>Art</Link>
        <Link href="/excelvba" className="nav-link" style={{ marginRight: '16px' }}>ExcelVBA</Link>
        <Link href="/contact" className="nav-link" style={{ marginRight: '16px' }}>Contact</Link>
      </div>
      <div className="nav-right">
        <SearchBar />
        {/* 以下、認証ボタン（AuthButton）は必要なら追加してください */}
      </div>
    </header>
  );
}

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
          <p>Reload or contact support if the issue persists.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  useEffect(() => { console.log('[MyApp] mounted on client side.'); }, []);

  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <Head>
          <title>My Legendary Website</title>
          <meta name="description" content="Next.js app without ChatGPT chat interface." />
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
