// pages/_app.tsx

import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import { useRouter } from 'next/router'

import '../styles/globals.css'  // TailwindやnavbarなどのCSSまとめて読む
import ChatGPTInterface from '../components/ChatGPTInterface'

// ============== NavBarコンポーネント ==============
function NavBar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/aichat" className="nav-link">AI Chat</Link>
        <Link href="/art" className="nav-link">Art</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
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

// ============== 簡易エラーバウンダリー ==============
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
          <p>Please reload the page or contact support.</p>
        </div>
      )
    }
    return this.props.children
  }
}

// ============== メインの MyApp ==============
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    console.log('MyApp mounted - client side.')
  }, [])

  return (
    <ErrorBoundary>
      <Head>
        <title>0 - GPT-4 Quantum Clone</title>
        <meta
          name="description"
          content="GPT-4 site with references to quantum illusions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* 
        従来: cosmicSim.js / quantum3D.js / starsAnim.js / waveAnim.js を読み込み
        この下で書き換え版スクリプトを読み込む
      */}
      <Script src="/js/cosmicSim.js" strategy="afterInteractive" />
      <Script src="/js/quantum3D.js" strategy="afterInteractive" />
      <Script src="/js/starsAnim.js" strategy="afterInteractive" />
      <Script src="/js/waveAnim.js"  strategy="afterInteractive" />

      <div className="global-bg-canvas-container">
        <canvas id="bg-canvas" className="bg-canvas-layer" />
        <canvas id="stars-canvas" className="bg-canvas-layer" />
        <canvas id="wave-canvas" className="bg-canvas-layer" />
      </div>

      <div id="app-wrapper">
        <NavBar />

        <main id="main-content">
          <Component {...pageProps} />
        </main>

        <footer id="chat-footer">
          {router.pathname !== '/' && router.pathname !== '/art' && (
            <ChatGPTInterface isPage1Override={router.pathname === '/'} />
          )}
        </footer>
      </div>
    </ErrorBoundary>
  )
}

export default MyApp
