// components/desktop/Page2Desktop.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page2Desktop() {
  useEffect(() => {
    // グローバルfooterを隠し、このページ専用のチャットUIを表示したい場合
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <div className="page2-desktop-wrapper">
      <section className="desktop-hero-section">
        <h1>[PC版] Page2 - Supreme GPT-4 Portal</h1>
        <h2>What can I help you with? (Desktop Layout - Page2)</h2>
        <p>
          ここでは Page1 と同じUIで、2ページ目用のテキストを表示するだけ。
        </p>
      </section>

      <section className="desktop-public-section">
        <h2>Civilization's Most Advanced GPT-4 Portal (PC) - Page2</h2>
        <p>
          We unify unstoppable synergy of GPT-4 with quantum illusions (page2).
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
