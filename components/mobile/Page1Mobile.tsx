// components/mobile/Page1Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page1Mobile() {
  useEffect(() => {
    // グローバルfooter (固定チャット) を消す
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
      <section className="mobile-hero-section hero-section-clone" style={{ position:'relative' }}>
        <div className="hero-content" style={{ color:'#fff', textAlign:'center' }}>
          <h1 className="hero-title" style={{ textShadow:'0 2px 5px rgba(0,0,0,0.6)' }}>
            0へようこそ <br />(Welcome to 0)
          </h1>
          <h2 className="hero-subtitle" style={{ marginTop:'1rem', color:'#ffccaa' }}>
            What can I help you with? (Mobile Layout)
          </h2>
          <p className="hero-description" style={{ color:'#ffeedd', marginTop:'1rem' }}>
            スマホ画面でも量子アニメーションを楽しみつつ、<br/>
            chatgpt.com 同様の機能を実装予定。
          </p>
        </div>
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
