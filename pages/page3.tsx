// pages/page3.tsx
import React from 'react'
import Head from 'next/head'
import '../public/css/kaleido3.css'

// 著作権/参考文献ドロップダウン
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function Page3() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page3 | Purple Lightning & SparseMoE</title>
        <link rel="stylesheet" href="/css/kaleido3.css"/>
      </Head>

      <main className="root-container">
        <div className="svgWrap3">
          <svg className="kaleido3Svg" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="grad3" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#cc00ff"/>
                <stop offset="100%" stopColor="#550066"/>
              </radialGradient>
            </defs>
            <rect
              x="40" y="40" width="120" height="120"
              fill="url(#grad3)"
              className="rectSpin1"
            />
            <circle
              cx="100" cy="100" r="35"
              fill="none" stroke="#fff" strokeWidth="2"
              className="circleSpark"
            />
          </svg>
        </div>

        <section className="frontContent3">
          <h2>Purple Lightning: Sparse Gated MoE</h2>
          <p>
            Harness advanced MoE (Mixture-of-Experts) with lightning storms.
            <br />
            <a href="https://arxiv.org/abs/1701.06538" target="_blank" rel="noreferrer">
              Sparse Gated MoE (arXiv:1701.06538)
            </a>
          </p>

          <div style={{ margin: '2rem 0' }}>
            <h3>Download Resume & CareerHistory</h3>
            <p>
              <a href="/docs/MasakiKusaka_Resume.docx" download>Resume (Word)</a> |{' '}
              <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume (PDF)</a>
            </p>
            <p>
              <a href="/docs/MasakiKusaka_CareerHistory.docx" download>CareerHistory (Word)</a> |{' '}
              <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>CareerHistory (PDF)</a>
            </p>
          </div>

          {/* 参考文献ドロップダウン */}
          <ReferencesDropdown />
        </section>
      </main>
    </>
  )
}
