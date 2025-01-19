// pages/_app.tsx

import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import { useRouter } from 'next/router'

import '../styles/globals.css' // 全体CSS
import ChatGPTInterface from '../components/ChatGPTInterface'

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

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    console.log('_app mounted - client side')
  }, [])

  return (
    <ErrorBoundary>
      <Head>
        <title>0 - GPT-4 MegaCosmos</title>
        <meta
          name="description"
          content="World-class cosmic illusions, multi-galaxy slow orbits, quantum swirl, infinite meteors."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* ▼ 既存アニメ (上部だけに表示したい cosmicSim + quantum3D + starsAnim + waveAnim) */}
      <Script
        src="/js/cosmicSim.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startCosmicSim' in window) {
            // @ts-ignore
            window.startCosmicSim()
          }
        }}
      />
      <Script
        src="/js/quantum3D.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startQuantum3D' in window) {
            // @ts-ignore
            window.startQuantum3D()
          }
        }}
      />
      <Script
        src="/js/starsAnim.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startStarsAnim' in window) {
            // @ts-ignore
            window.startStarsAnim()
          }
        }}
      />
      <Script
        src="/js/waveAnim.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startWaveAnim' in window) {
            // @ts-ignore
            window.startWaveAnim()
          }
        }}
      />

      {/* 背景キャンバス (Home上部用) */}
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

        {/* 
          フッターのチャット => 
          「Contactページは白背景チャットが重複する」のを防ぐため、Contactを除外 
        */}
        <footer id="chat-footer">
          {router.pathname !== '/' &&
           router.pathname !== '/art' &&
           router.pathname !== '/aichat' &&
           router.pathname !== '/contact' && ( // ←Contactも除外
             <ChatGPTInterface />
          )}
        </footer>
      </div>
    </ErrorBoundary>
  )
}
