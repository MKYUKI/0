// pages/index.tsx
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 | Quantum-Transformer Home</title>
        {/* kaleidoBase + kaleido1 => swirl */}
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido1.css" />
      </Head>

      <main className="kaleidoMain">
        {/* swirling SVG */}
        <div className="svgWrap1">
          <svg
            className="kaleido1Svg"
            viewBox="0 0 220 220"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff99ff" />
                <stop offset="100%" stopColor="#ff33cc" />
              </radialGradient>
            </defs>
            <circle
              cx="110"
              cy="110"
              r="80"
              fill="url(#grad1)"
              className="circleSpin1"
            />
            <circle
              cx="110"
              cy="110"
              r="50"
              fill="none"
              stroke="#ffccff"
              strokeWidth="4"
              className="circleSpin2"
            />
            <path
              d="M110,20 L150,60 L110,100 L70,60 Z"
              fill="#fff"
              fillOpacity="0.5"
              className="pathSpin1"
            />
          </svg>
        </div>

        <section className="frontContent1">
          <h1>MasakiKusaka 日下真旗: Portfolio + Resume</h1>
          <p style={{ marginBottom: '1rem' }}>
            This site merges fractal illusions with multi-head self-attention,
            culminating in a historically apex civilization platform. 
            Enjoy unstoppable unstoppable code. 
          </p>

          {/* Download links */}
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <h3>Resume & CareerHistory (Word/PDF)</h3>
            <p>
              <a
                href="/docs/MasakiKusaka_Resume.docx"
                download
                style={{ color: '#d00855', marginRight: '1rem' }}
              >
                Download Resume (Word)
              </a>
              <a
                href="/docs/MasakiKusaka_Resume.pdf"
                download
                style={{ color: '#bc03b5' }}
              >
                Download Resume (PDF)
              </a>
            </p>
            <p>
              <a
                href="/docs/MasakiKusaka_CareerHistory.docx"
                download
                style={{ color: '#d00855', marginRight: '1rem' }}
              >
                Download CareerHistory (Word)
              </a>
              <a
                href="/docs/MasakiKusaka_CareerHistory.pdf"
                download
                style={{ color: '#bc03b5' }}
              >
                Download CareerHistory (PDF)
              </a>
            </p>
          </div>

          <p>
            This platform is an unstoppable unstoppable code merging 
            2017 Transformer “Attention is All You Need” architecture with 
            quantum geometry fractals, wave animations, 3D star fields, 
            and advanced iFrame logic. 
          </p>

          <nav style={{ marginTop: '2rem' }}>
            <a href="/page2" style={{ fontWeight: 'bold' }}>
              ⇒ Go to Page2
            </a>
          </nav>
        </section>
      </main>
    </>
  )
}
