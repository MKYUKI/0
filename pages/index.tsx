// pages/index.tsx
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 | MasakiKusaka (Resume/Portfolio)</title>
        {/* kaleidoBase + kaleido1 => アニメを最先端に刷新 */}
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido1.css" />
      </Head>

      <main className="kaleidoMain">
        {/* ピンク系SVGアニメ */}
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
            <circle cx="110" cy="110" r="80" fill="url(#grad1)" className="circleSpin1" />
            <circle cx="110" cy="110" r="50" fill="none" stroke="#ffccff" strokeWidth="4" className="circleSpin2" />
            <path
              d="M110,20 L150,60 L110,100 L70,60 Z"
              fill="#fff"
              fillOpacity="0.5"
              className="pathSpin1"
            />
          </svg>
        </div>

        <section className="frontContent1">
          <h2 style={{ fontSize: '1.5rem' }}>
            MasakiKusaka日下真旗 — Resume & Portfolio
          </h2>
          <p>
            Download my Word/PDF resume below, or see the full text on this page.
            (All content <strong>©2024</strong> or later)
          </p>

          {/* --- Word/PDF ダウンロードリンク --- */}
          <div style={{ margin: '1rem 0' }}>
            <a
              href="/docs/MasakiKusaka_Resume.docx"
              download
              style={{
                display: 'inline-block',
                marginRight: '1.5rem',
                color: '#cc0077',
                textDecoration: 'underline'
              }}
            >
              Download Word (.docx)
            </a>
            <a
              href="/docs/MasakiKusaka_Resume.pdf"
              download
              style={{
                display: 'inline-block',
                color: '#cc0077',
                textDecoration: 'underline'
              }}
            >
              Download PDF (.pdf)
            </a>
          </div>

          <hr style={{ margin: '1rem 0', borderColor: '#ccc' }} />

          {/* --- 履歴書・職務経歴書の全文 --- */}
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto',
            textAlign: 'left',
            background: 'rgba(255,255,255,0.5)',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <h3>【履歴書】 (2024年11月08日時点)</h3>
            <p><strong>氏名:</strong> 日下真旗 (Masaki Kusaka), 2000年07月03日生 (男, 24歳)</p>
            <p><strong>住所:</strong> 東京都大田区久が原2-28-25 シェアハウス203号室</p>
            <p><strong>電話:</strong> 070-8943-2121, <strong>Email:</strong> masaki136928@gmail.com</p>
            <p>… (略: 学歴・職歴・志望動機などを全て掲載) …</p>
            <p>
              <strong>学歴:</strong><br/>
              2016/4 私立如水館高等学校 入学<br/>
              2019/3 私立如水館高等学校 卒業<br/>
              2019/4 広島国際大学保健医療学部救急救命学科 入学 → 2020/9 中退
            </p>
            <p>
              <strong>職歴 (アルバイト・契約社員 etc):</strong><br/>
              2019/5 ～ 2020/11: (株)藤三ビックハウス黒瀬店, <br/>
              2020/12 ～ 2022/7: コスモ石油内海(株)福山神辺SS, <br/>
              …(以下略)…
            </p>
            <p>
              2023/4 ～ 2023/9: (株)3Backs (契約社員)<br/>
              2023/11～: 人財BANK(株) (在職, 契約社員)
            </p>
            <p>… (免許/資格: 普通自動車免許, etc) …</p>
            <p>… (志望動機など) …</p>

            <hr/>

            <h3>【職務経歴書】 (2024年11月12日)</h3>
            <p>
              <strong>職務要約:</strong><br/>
              広島国際大学保健医療学部救急救命学科で学ぶ中で人命救助に関わる知識を修得…<br/>
              (以降、職務経歴詳細を全文掲載。)
            </p>
            <p>…(ITスキル, Python学習歴, Udemy講座実績, PCスキル, 転職理由, 連絡先 etc)…</p>
            <p>
              <strong>ポートフォリオ:</strong> Next.js 6ページ構成サイト, テキスト→音声変換ツール (Streamlit) …<br/>
              <strong>執筆活動:</strong> 8年間で40冊出版 (Amazon Kindle ほか) …<br/>
            </p>
          </div>

          <hr style={{ margin: '1rem 1rem' }} />

          <nav style={{ marginTop: '1rem' }}>
            <a href="/page2" style={{ color: '#cc0077' }}>
              ⇒ Go to Page2 (AquaFlow + MoE)
            </a>
          </nav>
        </section>
      </main>
    </>
  )
}
