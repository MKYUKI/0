// pages/page2.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function Page2() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page2 (MasakiKusaka Homepage)</title>
      </Head>

      {/**
       * ★ ここで minHeight を確保し、上部アニメをしっかり表示
       */}
      <main className="page2-main-container">
        <section className="black-quantum-bg">
          <div className="white-page-foreground">
            <h1>MasakiKusaka’s Official Home - by 0</h1>
            <p className="intro">
              (Restored) Majestic synergy with black quantum lines. 
              Enough vertical space to enjoy the original animation.
            </p>

            <div className="resume-section">
              <h3>Resume & Career History</h3>
              <p>
                <a href="/docs/MasakiKusaka_Resume.docx" download>Resume (Word)</a> |{' '}
                <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume (PDF)</a>
              </p>
              <p>
                <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Career (Word)</a> |{' '}
                <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>Career (PDF)</a>
              </p>
            </div>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
