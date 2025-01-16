// components/mobile/Page2Mobile.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page2Mobile() {
  useEffect(() => {
    // グローバルfooterを隠し、モバイルUIを使う
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) {
        globalFooter.style.display = ''
      }
    }
  }, [])

  return (
    <div className="page2-mobile-wrapper">
      {/* Hero */}
      <section className="mobile-hero-section">
        <h1>[モバイル版] Page2 - Quantum synergy</h1>
        <h2>Enough vertical space (Mobile)</h2>
        <p>
          2ページ目(モバイル)。1ページ目同様、小画面最適化レイアウト。
        </p>
      </section>

      {/* 履歴書ダウンロード */}
      <section className="mobile-resume-section">
        <h3>Resume &amp; Career (Mobile)</h3>
        <p>
          <a href="/docs/MasakiKusaka_Resume.docx" download>Resume (Word)</a> |{' '}
          <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume (PDF)</a>
        </p>
        <p>
          <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Career (Word)</a> |{' '}
          <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>Career (PDF)</a>
        </p>
        <div style={{ marginTop: '1rem' }}>
          <ReferencesDropdown />
        </div>
      </section>

      {/* チャット欄(モバイル版) */}
      <div style={{ marginTop: '1.5rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
