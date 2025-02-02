import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

// グローバルCSS
import '../styles/globals.css'

// ChatGPTInterfaceをフッターに表示
import ChatGPTInterface from '../components/ChatGPTInterface'

/**
 * シンプルなナビゲーションバー
 * ※「Books」リンクおよびJP/USボタンは削除済み
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
        {/* 検索欄などを追加する場合はここに */}
      </div>
    </header>
  )
}

/**
 * 簡易エラーバウンダリー
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
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    console.log('[MyApp] mounted on client side.')
  }, [])

  return (
    <ErrorBoundary>
      <Head>
        <title>GPT-3.5 App with Fallback</title>
        <meta
          name="description"
          content="Next.js + GPT-3.5, with fallback for insufficient_quota error."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div id="app-wrapper" style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
        <NavBar />

        <main id="main-content" style={{ padding: '20px' }}>
          <Component {...pageProps} />
        </main>

        {/**
         * フッターに GPTチャット欄を表示
         * ※表示しないページ： '/', '/art', '/aichat', '/contact', '/books', '/excelvba'
         */}
        <footer id="chat-footer" style={{ marginTop: '20px', padding: '10px' }}>
          {router.pathname !== '/' &&
            router.pathname !== '/art' &&
            router.pathname !== '/aichat' &&
            router.pathname !== '/contact' &&
            router.pathname !== '/books' &&
            router.pathname !== '/excelvba' && (
              <div style={{ borderTop: '1px solid #666', paddingTop: '8px' }}>
                <h3>Global GPT Chat</h3>
                <ChatGPTInterface
                  isGlass={false}
                  maxTokens={1200}
                  temperature={0.7}
                  presencePenalty={0}
                  frequencyPenalty={0}
                />
              </div>
            )}
        </footer>
      </div>
    </ErrorBoundary>
  )
}
