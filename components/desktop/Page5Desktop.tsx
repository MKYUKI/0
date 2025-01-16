// components/desktop/Page5Desktop.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page5Desktop() {
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <div className="page5-desktop-wrapper">
      <section className="desktop-hero-section">
        <h1>[PC版] Page5</h1>
        <p>5ページ目(PC) 用ヒーローセクションやテキストなど。</p>
      </section>

      <section className="desktop-info-section">
        <h3>Resume / Info (Desktop Page5)</h3>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '2rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
