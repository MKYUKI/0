// components/desktop/Page1Desktop.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page1Desktop() {
  useEffect(() => {
    // グローバル footer チャットを隠す
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
      {/* hero-section-clone を透過に */}
      <section className="desktop-hero-section hero-section-clone">
        <div className="hero-content">
          <h1 className="hero-title">0へようこそ (Welcome to 0)</h1>
          <h2 className="hero-subtitle">What can I help you with? (Desktop Layout)</h2>
          <p className="hero-description">
            世界最大級アニメーションが背後に広がり、<br/>
            chatgpt.com 相当の機能を狙います。
          </p>
        </div>
      </section>

      <section className="desktop-public-section">
        <h2>Civilization's Most Advanced GPT-4 Portal (PC)</h2>
        <p>
          Unify unstoppable synergy of GPT-4 with quantum illusions, wide-screen style.
        </p>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '2rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
