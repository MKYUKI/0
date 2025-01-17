// components/desktop/Page1Desktop.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page1Desktop() {
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
    <div className="page1-desktop-wrapper">
      <section className="desktop-hero-section hero-section-clone" style={{ position:'relative' }}>
        <div className="hero-content">
          {/* ★★★ ここで大見出し: 0へようこそ ★★★ */}
          <h1 className="hero-title" style={{ color:'#fff', textShadow:'0 2px 8px rgba(0,0,0,0.6)' }}>
            0へようこそ <br /> (Welcome to 0)
          </h1>
          <h2 className="hero-subtitle" style={{ color:'#ffddaa', marginTop:'1rem' }}>
            What can I help you with? (Desktop Layout)
          </h2>
          <p className="hero-description" style={{ color:'#ffeecc', marginTop:'1rem' }}>
            背後に量子アニメーションが広がっています。<br/>
            chatgpt.com と同等の機能を目指します。
          </p>
        </div>
      </section>

      <section className="desktop-public-section">
        <h2>Civilization's Most Advanced GPT-4 Portal (PC)</h2>
        <p>
          We strive to unify unstoppable synergy of GPT-4 with quantum illusions,
          leveraging wide-screen layouts for a better user experience.
        </p>
        <ReferencesDropdown />
      </section>

      {/* ページ内チャットUI (PC向け) */}
      <div style={{ marginTop: '2rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
