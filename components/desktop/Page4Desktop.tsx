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
        <h1>[PC版] Page4</h1>
        <p>
          4ページ目(PC)。1～3ページ目と同様に記載。
        </p>
      </section>

      <section className="desktop-info-section">
        <h3>Some Info (Desktop Page4)</h3>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '2rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
