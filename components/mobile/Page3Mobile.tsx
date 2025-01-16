// components/mobile/Page3Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page3Mobile() {
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) globalFooter.style.display = ''
    }
  }, [])

  return (
    <div className="page3-mobile-wrapper">
      <section className="mobile-hero-section">
        <h1>[モバイル版] Page3</h1>
        <p>
          3ページ目(モバイル)。Page1/2と同じ構成でOK。
        </p>
      </section>

      <section className="mobile-info-section">
        <h3>Resume / Info (Mobile Page3)</h3>
        <p>
          <a href="/docs/MasakiKusaka_Resume.docx" download>Resume</a> |{' '}
          <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Career</a>
        </p>
        <ReferencesDropdown />
      </section>

      <div style={{ marginTop: '1rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
