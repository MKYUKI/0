// components/desktop/Page4Desktop.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page4Desktop() {
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <div className="page4-desktop-wrapper">
      <section className="desktop-hero-section">
        <h1>[PC版] Page4 - Supreme GPT-4 Portal</h1>
        <h2>Desktop Layout - Page4</h2>
        <p>
          4ページ目のコンテンツ、Page1と全く同じレイアウトでOK。
        </p>
      </section>

      <section className="desktop-public-section">
        <h2>GPT-4 Portal (PC) - Page4</h2>
        <p>
          Additional text or references for page4...
        </p>
        <ReferencesDropdown />
      </section>

      {/* ページ内チャットUI (PC) */}
      <div style={{ marginTop: '2rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
