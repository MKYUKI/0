// pages/_app.tsx
import type { AppProps } from 'next/app'
import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
// Global CSS
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'
import '../public/css/page1.css'
import '../public/css/page2.css'
import '../public/css/page3.css'
import '../public/css/page4.css'
import '../public/css/page5.css'
import '../public/css/page6.css'
import ChatGPTInterface from '../components/ChatGPTInterface'

// NavBar
function NavBar() {
  return (
    <nav style={{ textAlign:'center', padding:'0.6rem', background:'#222' }}>
      <Link href="/">
        <span style={{ color:'#fff', margin:'0 8px' }}>Page1</span>
      </Link>
      <Link href="/page2">
        <span style={{ color:'#fff', margin:'0 8px' }}>Page2</span>
      </Link>
      <Link href="/page3">
        <span style={{ color:'#fff', margin:'0 8px' }}>Page3</span>
      </Link>
      <Link href="/page4">
        <span style={{ color:'#fff', margin:'0 8px' }}>Page4</span>
      </Link>
      <Link href="/page5">
        <span style={{ color:'#fff', margin:'0 8px' }}>Page5</span>
      </Link>
      <Link href="/page6">
        <span style={{ color:'#fff', margin:'0 8px' }}>Page6</span>
      </Link>
    </nav>
  )
}

// Optional Popup
function AttentionPopup() { /* 省略、上記通り */ }

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isPage1 = (router.pathname === '/')

  return (
    <>
      <Head>
        <title>0 - Supreme GPT</title>
        <meta name="description" content="0: GPT-4, illusions, synergy." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js"  strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js"   strategy="beforeInteractive" />

      {/* Background Canvas */}
      <div style={{ position:'fixed', inset:0, zIndex:0 }}>
        <canvas id="bg-canvas"    className="bg-canvas-layer" />
        <canvas id="stars-canvas" className="bg-canvas-layer" />
        <canvas id="wave-canvas"  className="bg-canvas-layer" />
      </div>

      {/* Main Content */}
      <div style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>
        <NavBar />
        <AttentionPopup />
        <Component {...pageProps} />
      </div>

      {/* Footer Chat */}
      <footer
        style={{
          position:'fixed',
          bottom:0, left:0, width:'100%',
          background:'#f0f0f0',
          boxShadow:'0 -2px 5px rgba(0,0,0,0.1)',
          zIndex:10
        }}
      >
        <ChatGPTInterface isPage1={isPage1} />
      </footer>
    </>
  )
}
