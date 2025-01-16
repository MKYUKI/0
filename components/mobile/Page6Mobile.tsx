// components/mobile/Page6Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page6Mobile() {
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) {
        globalFooter.style.display = ''
      }
    }
  }, [])

  return (
    <div className="page6-mobile-wrapper">
      <section className="mobile-hero-section">
        <h1>[モバイル版] Page6</h1>
        <p>6ページ目(モバイル)。まとめページなど。</p>
      </section>

      <section className="mobile-info-section">
        <h3>Summary (Mobile Page6)</h3>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '1rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
