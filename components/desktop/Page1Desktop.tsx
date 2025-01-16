// components/desktop/Page1Desktop.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page1Desktop() {
  useEffect(() => {
    // グローバルfooterを消す(代わりにページ内チャットを表示)
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
      <section className="desktop-hero-section">
        <h1>[PC版] Page1 - Supreme GPT-4 Portal</h1>
        <h2>What can I help you with? (Desktop Layout)</h2>
        <p>
          このPC向けページ1では、より広い画面を活かしたデザインを展開します。<br/>
          chatgpt.com と同等の機能を目指しています。
        </p>
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
