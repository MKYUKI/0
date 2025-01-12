// pages/page3.tsx
import Head from 'next/head';
import ReferencesDropdown from '../components/ReferencesDropdown'; // 追加

export default function Page3() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page3 | Purple Lightning & SparseMoE</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css"/>
        <link rel="stylesheet" href="/css/kaleido3.css"/>
      </Head>

      <main className="kaleidoMain">
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
            Page3: Harnessing
            <a href="https://arxiv.org/abs/1701.06538" target="_blank" rel="noreferrer"> Sparse Gated MoE</a>
            for massive parallelization in lightning storms.
          </p>

          {/* 追加: 履歴書・職務経歴ダウンロード UI (Word/PDF) */}
          <div className="resume-download-section">
            <h3>Download My Resume & Career History</h3>
            <p>
              <a href="/docs/MasakiKusaka_Resume.docx" download>Download Resume (Word)</a> |{' '}
              <a href="/docs/MasakiKusaka_Resume.pdf" download>Download Resume (PDF)</a>
            </p>
            <p>
              <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Download CareerHistory (Word)</a> |{' '}
              <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>Download CareerHistory (PDF)</a>
            </p>
          </div>

          {/* 追加: 先端技術論文へのリンクを複数並べる(サンプル) */}
          <div className="cutting-edge-papers">
            <h3>Cutting-edge Papers & Technical References</h3>
            <ul>
              <li>
                <strong>AlphaFold</strong>: DeepMind's protein structure
                <br />
                <a href="https://www.nature.com/articles/s41586-021-03819-2" target="_blank" rel="noreferrer">
                  Nature (2021)
                </a>
              </li>
              <li>
                <strong>S4 Model (State Space)</strong>
                <br />
                <a href="https://arxiv.org/abs/2111.00396" target="_blank" rel="noreferrer">
                  arXiv:2111.00396
                </a>
              </li>
              <li>
                <strong>Reformer: Efficient Transformers</strong>
                <br />
                <a href="https://arxiv.org/abs/2001.04451" target="_blank" rel="noreferrer">
                  arXiv:2001.04451
                </a>
              </li>
              {/* 必要に応じてさらに論文を追加 */}
            </ul>
          </div>

          {/* ドロップダウンで著作権・参考文献表記を入れる */}
          <div style={{ marginTop: '2rem' }}>
            <ReferencesDropdown />
          </div>

          <nav style={{ marginTop: '2rem' }}>
            <a href="/page4">⇒ Page4</a>
          </nav>
        </section>
      </main>
    </>
  );
}
