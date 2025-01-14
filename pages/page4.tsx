// pages/page4.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'


export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page4 | Advanced AI Lab</title>
        <script src="/js/page4Logic.js" defer />
      </Head>

      <main className="page4-lab-container">
        <canvas id="page4-canvas" className="page4-canvas"></canvas>

        <section className="ai-lab-content">
          <h2>Advanced AI Lab</h2>
          <p>
            Explore multi-modal uploads: text, Word/PDF, images, even live streams,
            feeding into GPT-4 synergy for collaborative analysis.
          </p>
          <button>Upload and Analyze</button>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
