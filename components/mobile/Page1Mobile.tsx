// components/mobile/Page1Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page1Mobile() {
  useEffect(() => {
    // グローバルfooterを隠してモバイル専用UI
    const gf = document.getElementById('chat-footer')
    if (gf) gf.style.display = 'none'
    return () => {
      if (gf) gf.style.display = ''
    }
  }, [])

  return (
    <div className="page1-mobile-wrapper">
      <section className="mobile-hero-section hero-section-clone" style={{ background: 'transparent' }}>
        <div className="hero-content" style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '12px', padding: '1.5rem' }}>
          <h1 className="hero-title" style={{ color: '#fff' }}>0へようこそ (Welcome to 0)</h1>
          <h2 className="hero-subtitle" style={{ color: '#ffddaa' }}>
            What can I help you with? (Mobile Layout)
          </h2>
          <p className="hero-description" style={{ color: '#ffeecc' }}>
            スマホでも世界最大級の量子アニメが背後に広がります。<br/>
            GPT-4の機能をどこでも利用可能です。
          </p>
        </div>
      </section>

      <section className="mobile-public-section" style={{ marginTop: '1rem' }}>
        <h3>GPT-4 Mobile Synergy</h3>
        <p>Experience unstoppable synergy of GPT-4 on a smaller screen.</p>
        <ReferencesDropdown />
      </section>

      {/* ページ内ローカルチャット (モバイル向け) */}
      <div style={{ marginTop: '1.5rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
