// components/mobile/Page1Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page1Mobile() {
  useEffect(() => {
    // グローバルfooterを隠し、モバイル専用UIを表示
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) {
        globalFooter.style.display = ''
      }
    }
  }, [])

  return (
    <div className="page1-mobile-wrapper">
      <section className="mobile-hero-section">
        <h1>[モバイル版] Page1 - Supreme GPT-4 Portal</h1>
        <h2>What can I help you with? (Mobile Layout)</h2>
        <p>
          小さな画面に最適化されたモバイルレイアウトです。<br/>
          chatgpt.com と同等の機能を、スマホサイズでも快適に。
        </p>
      </section>

      <section className="mobile-public-section">
        <h3>GPT-4 Mobile Synergy</h3>
        <p>
          Harness unstoppable synergy of GPT-4, now on a smaller screen. 
        </p>
        <ReferencesDropdown />
      </section>

      {/* ページ内ローカルチャット (モバイル向け) */}
      <div style={{ marginTop: '1.5rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
