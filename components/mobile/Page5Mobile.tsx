// components/mobile/Page5Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page5Mobile() {
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <div className="page5-mobile-wrapper">
      <section className="mobile-hero-section">
        <h1>[モバイル版] Page5 - Supreme GPT-4 Portal</h1>
        <h2>Mobile Layout - Page5</h2>
        <p>
          5ページ目モバイル版。
        </p>
      </section>

      <section className="mobile-public-section">
        <h3>GPT-4 Mobile - Page5</h3>
        <p>
          Additional info for page5 (mobile).
        </p>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '1.5rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
