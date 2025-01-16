// components/mobile/Page4Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page4Mobile() {
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <div className="page4-mobile-wrapper">
      <section className="mobile-hero-section">
        <h1>[モバイル版] Page4</h1>
        <p>4ページ目(モバイル)。</p>
      </section>

      <section className="mobile-info-section">
        <h3>Info (Mobile Page4)</h3>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '1rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
