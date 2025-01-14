// pages/page2.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function Page2() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page2 (MasakiKusaka Homepage - Inverted)</title>
      </Head>

      <main className="page2-container">
        <section className="outer-white-bg">
          <div className="black-foreground">
            <h1>MasakiKusaka Official Home - by 0</h1>
            <p className="intro">
              Black container with white text, green link references below. 
              Word/PDF downloads included.
            </p>

            <div className="resume-section">
              <h3>Resume & Career</h3>
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
