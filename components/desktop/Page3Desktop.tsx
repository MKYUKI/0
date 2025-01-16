// components/desktop/Page3Desktop.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page3Desktop() {
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <div className="page3-desktop-wrapper">
      <section className="desktop-hero-section">
        <h1>[PC版] Page3 - Supreme GPT-4 Portal</h1>
        <h2>Desktop Layout - Page3</h2>
        <p>
          3ページ目のコンテンツ。Page1と同様のデザインでOK。
        </p>
      </section>

      <section className="desktop-public-section">
        <h2>GPT-4 Portal (PC) - Page3</h2>
        <p>
          Additional text or references for page3...
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
