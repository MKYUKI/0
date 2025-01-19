// =================================
// File: pages/aichat.tsx (2ページ目)
// =================================
import Head from 'next/head'
import React, { useEffect } from 'react'
import Script from 'next/script'
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function AiChat() {
  useEffect(() => {
    console.log("[AI Chat page] mounted on client side.")
  }, [])

  return (
    <>
      <Head>
        <title>AI Chat - 銀河アニメ背景</title>
        <meta
          name="description"
          content="単一3D銀河・星雲の壮大アニメーションを背景にしたAIチャットページ"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/* 背景に4つのcanvasを重ねる (galaxyArtSim, rotatingGalaxies, artStars, artNeula) */}
      <div id="aichat-bg-wrapper">
        <canvas id="galaxy-art-canvas"></canvas>
        <canvas id="rotating-galaxies-canvas"></canvas>
        <canvas id="art-stars-canvas"></canvas>
        <canvas id="art-nebula-canvas"></canvas>

        {/* 前面コンテンツ */}
        <div className="aichat-foreground">
          <h1 style={{ textAlign: 'center', color: '#fff', marginBottom: '20px' }}>
            AI Chat (Galaxy Background)
          </h1>

          {/* チャット欄 => 完全透過 */}
          <ChatGPTInterface isGlass />
        </div>
      </div>

      {/* ▼ 新アニメ4つのスクリプトを読み込む */}
      <Script
        src="/js/galaxyArtSim.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startGalaxyArtSim' in window) {
            // @ts-ignore
            window.startGalaxyArtSim()
          }
        }}
      />
      <Script
        src="/js/rotatingGalaxies.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startRotatingGalaxies' in window) {
            // @ts-ignore
            window.startRotatingGalaxies()
          }
        }}
      />
      <Script
        src="/js/artStars.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startArtStars' in window) {
            // @ts-ignore
            window.startArtStars()
          }
        }}
      />
      <Script
        src="/js/artNeula.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startArtNebula' in window) {
            // @ts-ignore
            window.startArtNebula()
          }
        }}
      />
    </>
  )
}
