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

      <main className="page2-container">
        {/* 黒い量子背景 → 白いpage */}
        <section className="black-quantum-bg">
          <div className="white-page-foreground">
            <h1>MasakiKusaka’s Official Home - by 0</h1>
            <p className="intro">
              Behold the pinnacle of cosmic creation. Welcome to the grand platform
              where black quantum lines swirl in majestic synergy.
            </p>

            <div className="resume-section">
              <h3>Resume & Career History Download</h3>
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
