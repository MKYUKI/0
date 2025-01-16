// components/mobile/Page2Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page2Mobile() {
  useEffect(() => {
    // グローバルfooterを隠し、このページ独自のチャット欄を使う場合
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <div className="page2-mobile-wrapper">
      <section className="mobile-hero-section">
        <h1>[モバイル版] Page2 - Supreme GPT-4 Portal</h1>
        <h2>What can I help you with? (Mobile Layout - Page2)</h2>
        <p>
          2ページ目モバイルレイアウト。Page1をクローン。
        </p>
      </section>

      <section className="mobile-public-section">
        <h3>GPT-4 Mobile Synergy - Page2</h3>
        <p>
          This is the mobile layout text for page2.
        </p>
        <ReferencesDropdown />
      </section>

      {/* ページ内チャットUI (モバイル) */}
      <div style={{ marginTop: '1.5rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
