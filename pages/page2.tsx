// pages/page2.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function Page2() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page2 (MasakiKusaka Homepage, 70% Chat)</title>
      </Head>

      <main className="page2-container">
        {/* 外側 背景は真っ白 */}
        <section className="outer-white-bg">
          {/* 黒いコンテナ */}
          <div className="black-page-foreground">
            <h1>MasakiKusaka Official Home - by 0</h1>
            <p className="intro">
              Word / PDF download links are shown in white text,
              and the background is black with green links.
            </p>

            <div className="resume-section">
              <h3>Resume & Career History</h3>
              <p>
                <a href="/docs/MasakiKusaka_Resume.docx" download>Resume (Word)</a>{' '}
                |{' '}
                <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume (PDF)</a>
              </p>
              <p>
                <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Career (Word)</a>{' '}
                |{' '}
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
