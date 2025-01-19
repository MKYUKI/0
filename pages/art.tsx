// ==============================
// File: pages/art.tsx
// ==============================
import Head from 'next/head'
import React, { useEffect } from 'react'
import Script from 'next/script'

export default function Art() {
  // このページでは全画面を覆うキャンバスを4枚重ねて
  // 1) galaxyArtSim.js       -- メインの単一3D銀河
  // 2) rotatingGalaxies.js   -- 銀河周辺の追加スワール・微星装飾
  // 3) artStars.js           -- 背景の星屑 & 流れ星
  // 4) artNeula.js           -- カラフル星雲

  useEffect(() => {
    console.log("[Art page] mounted on client side.")
  }, [])

  return (
    <>
      <Head>
        <title>Art - 3D銀河 (斜め横から) 超大規模シミュレーション</title>
        <meta
          name="description"
          content="宇宙史上最大級・最先端の単一3D銀河シミュレーション。ブラックホール無しで斜めから見た渦状銀河が回転し続ける。"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/* 全画面アニメを格納するラッパ */}
      <div id="art-wrapper">
        <canvas id="galaxy-art-canvas"></canvas>
        <canvas id="rotating-galaxies-canvas"></canvas>
        <canvas id="art-stars-canvas"></canvas>
        <canvas id="art-nebula-canvas"></canvas>
      </div>

      {/* 4つのスクリプトを読み込んで順に起動 */}
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
