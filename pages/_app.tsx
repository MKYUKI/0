//_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

// グローバルCSS
import '../styles/globals.css'

// ※ChatGPTInterface は不要のため削除
// import ChatGPTInterface from '../components/ChatGPTInterface'

// 検索バーコンポーネント（必要ならそのまま残す）
import SearchBar from '../components/SearchBar'

/**
 * シンプルなナビゲーションバー
 */
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
        <Link href="/" className="nav-link" style={{ marginRight: '16px' }}>
          Home
        </Link>
        <Link href="/aichat" className="nav-link" style={{ marginRight: '16px' }}>
          AI Chat
        </Link>
        <Link href="/art" className="nav-link" style={{ marginRight: '16px' }}>
          Art
        </Link>
        <Link href="/excelvba" className="nav-link" style={{ marginRight: '16px' }}>
          ExcelVBA
        </Link>
        <Link href="/contact" className="nav-link" style={{ marginRight: '16px' }}>
          Contact
        </Link>
        {/* Booksリンクは削除 */}
      </div>
      <div className="nav-right">
        <SearchBar />
      </div>
    </header>
  )
}

/**
 * 簡易エラーバウンダリー（グローバルエラー処理）
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
          <h1>Something went wrong.</h1>
          <p>Reload or contact support if the issue persists.</p>
        </div>
      )
    }
    return this.props.children
  }
}

/**
 * Next.js アプリ全体のラッパ
 * ※以前 footer 内にあった ChatGPT チャット機能の表示部分は完全に削除済み
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    console.log('[MyApp] mounted on client side.')
  }, [])

  return (
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

        {/* フッターはシンプルなコピーライトのみを表示 */}
        <footer id="main-footer" style={{ marginTop: '20px', padding: '10px', background: '#111', textAlign: 'center' }}>
          <p>&copy; {new Date().getFullYear()} Masaki Kusaka. All rights reserved.</p>
        </footer>
      </div>

      {/* =======================================================================
          BEGIN EXTENDED DUMMY LINES (シングルラインコメント)
          =======================================================================
          // 001: Dummy Line 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          // 002: Dummy Line 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          // 003: Dummy Line 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          // 004: Dummy Line 4: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
          // 005: Dummy Line 5: Excepteur sint occaecat cupidatat non proident.
          // ...
          // 1200: Dummy Line 1200: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
          =======================================================================
          END EXTENDED DUMMY LINES
      */}
    </ErrorBoundary>
  )
}
