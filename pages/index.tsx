// pages/index.tsx
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 | Quantum Apex | MasakiKusaka Resume</title>
        {/* 最新の kaleidoBase & kaleido1, etc. */}
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido1.css" />
      </Head>

      <main className="kaleidoMain">
        {/* SVG Animation (pink swirl) */}
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
              cx="110" cy="110" r="80"
              fill="url(#grad1)"
              className="circleSpin1"
            />
            <circle
              cx="110" cy="110" r="50"
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

        {/* ---- Foreground Content ---- */}
        <section className="frontContent1">
          <h2 style={{ fontSize: '1.8rem' }}>
            Masaki Kusaka Resume & Career History
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            This homepage integrates quantum fractal illusions with 
            <strong> multi-head self-attention</strong>. 
            We also host <strong>Word/PDF versions</strong> of 
            MasakiKusaka(日下真旗) official resume and career history.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            {/* Word links */}
            <a
              href="/docs/MasakiKusaka_Resume.docx"
              download
              style={{ color: '#f006', textDecoration: 'underline' }}
            >
              Download Resume (Word .docx)
            </a>
            <a
              href="/docs/MasakiKusaka_CareerHistory.docx"
              download
              style={{ color: '#f006', textDecoration: 'underline' }}
            >
              Download CareerHistory (Word .docx)
            </a>

            {/* PDF links */}
            <a
              href="/docs/MasakiKusaka_Resume.pdf"
              download
              style={{ color: '#c0c', textDecoration: 'underline' }}
            >
              Download Resume (PDF)
            </a>
            <a
              href="/docs/MasakiKusaka_CareerHistory.pdf"
              download
              style={{ color: '#c0c', textDecoration: 'underline' }}
            >
              Download CareerHistory (PDF)
            </a>
          </div>

          <p style={{ marginBottom: '1rem' }}>
            <em>All files are hosted in <code>public/docs/</code> folder, 
            ensuring direct download capability.</em>
          </p>

          <nav>
            <a href="/page2" style={{ fontWeight: 'bold' }}>
              ⇒ Explore Next: Page2
            </a>
          </nav>
        </section>
      </main>
    </>
  )
}
