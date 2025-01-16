// components/mobile/Page5Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page5Mobile() {
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
    <div className="page5-mobile-wrapper">
      <section className="mobile-hero-section">
        <h1>[モバイル版] Page5</h1>
        <p>5ページ目(モバイル)</p>
      </section>

      <section className="mobile-info-section">
        <h3>Resume / Info (Mobile Page5)</h3>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '1rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
