// File: pages/aichat.tsx
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'

// ★ Deepseek -> ChatGPT
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function AiChat() {
  useEffect(() => {
    console.log('[AI Chat page] mounted on client side.')
  }, [])

  return (
    <>
      <Head>
        <title>AI Chat - GPT-3.5</title>
        <meta
          name="description"
          content="A dedicated page that calls OpenAI GPT-3.5. Galaxy animations in the background."
        />
        <meta charSet="UTF-8" />
      </Head>

      {/* 4枚のcanvasを重ねる => galaxyArtSim, etc... */}
      <div id="aichat-bg-wrapper">
        <canvas id="galaxy-art-canvas"></canvas>
        <canvas id="rotating-galaxies-canvas"></canvas>
        <canvas id="art-stars-canvas"></canvas>
        <canvas id="art-nebula-canvas"></canvas>

        <div className="aichat-foreground">
          <h1 style={{ textAlign: 'center', color: '#fff', marginBottom: '20px' }}>
            AI Chat (GPT-3.5)
          </h1>

          {/* ChatGPTチャット欄 */}
          <ChatGPTInterface isGlass />
        </div>
      </div>

      {/* スクリプト読み込み (任意) */}
      <Script
        src="/js/galaxyArtSim.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ('startGalaxyArtSim' in window) {
            // @ts-ignore
            window.startGalaxyArtSim()
          }
        }}
      />
      <Script
        src="/js/rotatingGalaxies.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ('startRotatingGalaxies' in window) {
            // @ts-ignore
            window.startRotatingGalaxies()
          }
        }}
      />
      <Script
        src="/js/artStars.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ('startArtStars' in window) {
            // @ts-ignore
            window.startArtStars()
          }
        }}
      />
      <Script
        src="/js/artNeula.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ('startArtNebula' in window) {
            // @ts-ignore
            window.startArtNebula()
          }
        }}
      />
    </>
  )
}
