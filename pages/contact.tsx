// File: pages/contact.tsx

import Head from 'next/head'
import React, { useEffect } from 'react'
import Script from 'next/script'

// GPT-3.5用のチャットUI
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function Contact() {
  useEffect(() => {
    console.log('[Contact page] mounted on client side.')
  }, [])

  return (
    <>
      <Head>
        <title>Contact - GPT3.5 Test with Fallback</title>
        <meta
          name="description"
          content="Contact page with GPT-3.5 chat (fallback for insufficient_quota)."
        />
        <meta charSet="UTF-8" />
      </Head>

      <div id="contact-bg-wrapper" style={{ position: 'relative', minHeight: '100vh' }}>
        {/* もし背景アニメcanvas等があるなら、ここに重ねる */}
        <canvas id="galaxy-art-canvas" style={{ position: 'absolute' }} />
        <canvas id="rotating-galaxies-canvas" style={{ position: 'absolute' }} />
        <canvas id="art-stars-canvas" style={{ position: 'absolute' }} />
        <canvas id="art-nebula-canvas" style={{ position: 'absolute' }} />

        {/* 前面 */}
        <div style={{ position: 'relative', zIndex: 2, padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1>Contact Us</h1>
          <p>お問い合わせ内容があれば以下フォームより送信してください。</p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert('送信（サンプル）')
            }}
            style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '20px',
              borderRadius: '8px',
              marginTop: '20px',
              marginBottom: '40px'
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.3rem' }}>
                お名前
              </label>
              <input id="name" name="name" type="text" style={{ width: '100%', padding: '8px' }} required />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.3rem' }}>
                メールアドレス
              </label>
              <input id="email" name="email" type="email" style={{ width: '100%', padding: '8px' }} required />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.3rem' }}>
                お問い合わせ内容
              </label>
              <textarea id="message" name="message" rows={5} style={{ width: '100%', padding: '8px' }} required />
            </div>

            <button
              type="submit"
              style={{
                padding: '0.6rem 1.2rem',
                background: '#0066cc',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              送信
            </button>
          </form>

          <h2></h2>
          <p></p>

          {/* ChatGPTインターフェイスをそのまま配置 */}
          <ChatGPTInterface
            isGlass={true}
            maxTokens={1600}
            temperature={0.7}
            presencePenalty={0}
            frequencyPenalty={0}
          />
        </div>
      </div>

      {/* 背景用のScript（任意） */}
      <Script
        src="/js/galaxyArtSim.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            // @ts-ignore
            window.startGalaxyArtSim?.()
          }
        }}
      />
      <Script
        src="/js/rotatingGalaxies.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            // @ts-ignore
            window.startRotatingGalaxies?.()
          }
        }}
      />
      <Script
        src="/js/artStars.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            // @ts-ignore
            window.startArtStars?.()
          }
        }}
      />
      <Script
        src="/js/artNeula.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            // @ts-ignore
            window.startArtNebula?.()
          }
        }}
      />
    </>
  )
}
