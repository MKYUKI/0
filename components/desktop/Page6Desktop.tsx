// components/desktop/Page6Desktop.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page6Desktop() {
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
    <div className="page6-desktop-wrapper">
      <section className="desktop-hero-section">
        <h1>[PC版] Page6</h1>
        <p>6ページ目(PC)。最後のページという想定。</p>
      </section>

      <section className="desktop-info-section">
        <h3>Some Info or Summary (Desktop Page6)</h3>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '2rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
