// components/mobile/Page1Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page1Mobile() {
  useEffect(() => {
    // footer隠す
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) {
        globalFooter.style.display = ''
      }
    }
  }, [])

  return (
    <div className="page1-mobile-wrapper">
      <section className="mobile-hero-section hero-section-clone">
        <div className="hero-content">
          <h1 className="hero-title">0へようこそ (Welcome to 0)</h1>
          <h2 className="hero-subtitle">What can I help you with? (Mobile Layout)</h2>
          <p className="hero-description">
            背景に超大型量子アニメを敷き、<br/>
            スマホでも chatgpt.com と同等の快適さを。
          </p>
        </div>
      </section>

      <section className="mobile-public-section">
        <h3>GPT-4 Mobile Synergy</h3>
        <p>Enjoy unstoppable synergy of GPT-4 on smaller screens.</p>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '1.5rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
