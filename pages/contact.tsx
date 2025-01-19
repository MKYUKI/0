// =======================================
// File: pages/contact.tsx
// =======================================
import Head from 'next/head'
import React, { useEffect } from 'react'
import Script from 'next/script'
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function Contact() {
  useEffect(() => {
    console.log("[Contact page] mounted on client side.")
  }, [])

  return (
    <>
      <Head>
        <title>Contact - 宇宙背景</title>
        <meta
          name="description"
          content="Contact page with glassy top box. 3D銀河+星雲背景."
        />
        <meta charSet="UTF-8" />
      </Head>

      {/* 4枚のcanvas => 背景 */}
      <div id="contact-bg-wrapper">
        <canvas id="galaxy-art-canvas"></canvas>
        <canvas id="rotating-galaxies-canvas"></canvas>
        <canvas id="art-stars-canvas"></canvas>
        <canvas id="art-nebula-canvas"></canvas>

        {/* 前面コンテンツ */}
        <div className="contact-foreground">
          {/*
            ★ 一度チャット欄をすべて削除し、
            フォームとガラス風ボックスだけ残しました。
          */}
          <div className="glassy-contact-box">
            <h1>Contact Us</h1>
            <p style={{ marginBottom: '1rem' }}>
              お問い合わせは以下のフォームをご利用ください。
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert("サンプル送信しました。")
            }}
            style={{
              maxWidth: '500px',
              margin: '30px auto 40px auto',
              background: 'rgba(0,0,0,0.3)',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="name"
                style={{ display: 'block', marginBottom: '0.3rem', color: '#fff' }}
              >
                お名前
              </label>
              <input
                type="text"
                id="name"
                name="name"
                style={{ width: '100%', padding: '0.5rem' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="email"
                style={{ display: 'block', marginBottom: '0.3rem', color: '#fff' }}
              >
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                style={{ width: '100%', padding: '0.5rem' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="message"
                style={{ display: 'block', marginBottom: '0.3rem', color: '#fff' }}
              >
                内容
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                style={{ width: '100%', padding: '0.5rem' }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: '#0066cc',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              送信
            </button>
          </form>

          {/*
            ★ ここで改めてチャット欄を1つだけ追加する ★
            （isGlass => 背景をガラス風にするオプション）
          */}
          <ChatGPTInterface isGlass />
        </div>
      </div>

      {/* 4スクリプト => 背景アニメ */}
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
