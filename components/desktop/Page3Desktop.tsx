// components/desktop/Page3Desktop.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page3Desktop() {
  useEffect(() => {
    // footer消し
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <div className="page3-desktop-wrapper">
      <section className="desktop-hero-section">
        <h1>[PC版] Page3</h1>
        <h2>Similar to Page1 & Page2 Desktop Layout</h2>
        <p>
          3ページ目(PC)、基本の構成は同じです。
        </p>
      </section>

      <section className="desktop-info-section">
        <h3>Some Info / Resume (Desktop Page3)</h3>
        <p>
          <a href="/docs/MasakiKusaka_Resume.docx" download>Resume</a> |{' '}
          <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Career</a>
        </p>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '2rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
