// ===============================================
// File: pages/_app.tsx
// ===============================================
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import { useRouter } from 'next/router'

import '../styles/globals.css'
import ChatGPTInterface from '../components/ChatGPTInterface'

// NavBarコンポーネント
function NavBar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/aichat" className="nav-link">
          AI Chat
        </Link>
        <Link href="/art" className="nav-link">
          Art
        </Link>
        <Link href="/contact" className="nav-link">
          Contact
        </Link>
      </div>
      <div className="nav-right">
        <div className="search-container">
          <input type="text" placeholder="チャットで質問を入力..." />
          <div className="search-icon" />
        </div>
      </div>
    </header>
  )
}

// 簡易エラーバウンダリー
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
    console.error('ErrorBoundary caught an error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
          <h1>Something went wrong.</h1>
          <p>Please reload or contact support.</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    console.log('MyApp mounted - client side.')
  }, [])

  return (
    <ErrorBoundary>
      <Head>
        <title>GPT-4 Universe</title>
        <meta
          name="description"
          content="Cosmic illusions, multi-galaxy swirl, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* メインラッパ */}
      <div id="app-wrapper">
        <NavBar />

        <main id="main-content">
          <Component {...pageProps} />
        </main>

        {/*
          フッターChatを表示する条件:
          ルートパス(/)、/art、/aichat のいずれでもない場合。
          → Contact(/contact) も「除外条件」に追加して非表示化
        */}
        <footer id="chat-footer">
          {router.pathname !== '/' &&
           router.pathname !== '/art' &&
           router.pathname !== '/aichat' &&
           router.pathname !== '/contact' && (
             <ChatGPTInterface />
          )}
        </footer>
      </div>
    </ErrorBoundary>
  )
}
