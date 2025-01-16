// components/desktop/Page2Desktop.tsx
import React, { useEffect } from 'react'
import ReferencesDropdown from '../../components/ReferencesDropdown'
import ChatGPTInterface from '../../components/ChatGPTInterface'

export default function Page2Desktop() {
  useEffect(() => {
    // グローバルfooterを非表示 → ページ内チャットを使う
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) globalFooter.style.display = 'none'
    return () => {
      if (globalFooter) {
        globalFooter.style.display = ''
      }
    }
  }, [])

  return (
    <div className="page2-desktop-wrapper">
      {/* ヒーローセクション */}
      <section className="desktop-hero-section">
        <h1>[PC版] Page2 - Quantum synergy</h1>
        <h2>Enough vertical space for the original animation (Desktop)</h2>
        <p>
          2ページ目(PC向け)。1ページ目同様、白地＋灰色枠チャット風の雰囲気を継承。
        </p>
      </section>

      {/* 履歴書ダウンロード等 */}
      <section className="desktop-resume-section">
        <h3>Resume &amp; Career History (Desktop)</h3>
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

      {/* ページ内チャット */}
      <div style={{ marginTop: '2rem' }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
