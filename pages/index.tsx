// pages/index.tsx
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 | MasakiKusaka日下真旗 - Resume / Portfolio</title>
        {/* kaleidoBase + kaleido1 => 最新のピンク渦アニメ */}
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido1.css" />
      </Head>

      <main className="kaleidoMain">
        {/* Page1のSVGアニメ */}
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

        <section className="frontContent1">
          <h2 style={{ fontSize: '1.6rem' }}>MasakiKusaka日下真旗 — Resume / Portfolio</h2>
          <p>
            **Word形式・PDF形式**でのダウンロードも可能です。  
            本サイトはエンジニア転職・クラウドソーシング等での大規模ポートフォリオとして構築しています。
          </p>

          {/* --- Word/PDF ダウンロードリンク (docs/配下に実ファイルを置く) --- */}
          <div style={{ margin: '1rem 0' }}>
            <a
              href="/docs/MasakiKusaka_Resume.docx"
              download
              style={{
                marginRight: '1.5rem',
                textDecoration: 'underline',
                color: '#cc0077'
              }}
            >
              Download (Word .docx)
            </a>
            <a
              href="/docs/MasakiKusaka_Resume.pdf"
              download
              style={{
                textDecoration: 'underline',
                color: '#cc0077'
              }}
            >
              Download (PDF)
            </a>
          </div>

          <hr style={{ margin: '1rem 0', borderColor: '#ccc' }} />

          {/* --- 履歴書 + 職務経歴書をスクロール可能に掲載 --- */}
          <div style={{
            maxHeight: '350px',
            overflowY: 'auto',
            background: 'rgba(255,255,255,0.7)',
            padding: '1rem',
            borderRadius: '6px',
            textAlign: 'left'
          }}>
            <h3>【履歴書】(2024年11月08日現在)</h3>
            <p>フリガナ: クサカマサキ<br/>
               氏名: 日下真旗 (Masaki Kusaka)<br/>
               2000年07月03日生 (24歳, 男)  
               <br/>
               現住所: 〒146-0085 東京都大田区久が原2-28-25 シェアハウス203号室  
               電話: 070-8943-2121, Email: masaki136928@gmail.com
            </p>
            <p>… (学歴・職歴: 以下に全て記載) …</p>
            <p>2016/4 私立如水館高校 入学 ～ 2019/3 卒業<br/>
               2019/4 広島国際大学(救急救命学科) 入学 → 2020/9 中退<br/>
               2020/4～2021/9: セブンイレブン(アルバイト) …</p>
            <p>2021/10～2023/9: (株)3Backs(契約社員)<br/>
               2023/10～現在: 人財BANK株式会社(契約社員)
            </p>
            <p>…(免許・資格: 2019/3 普通自動車第一種免許 他)…</p>
            <p>…(志望動機, 通勤時間, 扶養家族, 希望記入欄 etc)…</p>

            <hr/>

            <h3>【職務経歴書】(2024年11月12日現在)</h3>
            <p>■職務要約:<br/>
              広島国際大学で救急救命学科を学び、人命救助の知識を得る…<br/>
              現在はITエンジニアを目指し、Pythonを独学…</p>
            <p>■職務経歴:<br/>
              2021/10～2023/9: (株)3Backs (コールセンター/事務作業/データ入力)…<br/>
              2023/10～: 人財BANK株式会社(三菱UFJアウトバウンドコールセンター業務)…<br/>
              (インバウンド/アウトバウンド 1日50-60件対応等)
            </p>
            <p>■活かせる経験・知識・技術: <br/>
               - PCスキル(Word/Excel/PowerPoint) <br/>
               - Python学習歴 (Progate, Udemy, SAMURAI, CyTech etc)</p>
            <p>■ポートフォリオ:<br/>
               (1) 6ページ構成のWebサイト(Next.js, TypeScript)<br/>
               (2) テキスト→音声変換ツール(Python/Streamlit) …<br/>
            </p>
            <p>…(本の執筆: 8年間にわたり40冊出版, X(旧Twitter)での宣伝…など)…</p>
            <p>■自己PR: 業務改善力 / 論理的思考 / 社会貢献への情熱 …<br/>
               ■転職理由: 救急救命からITエンジニアへキャリアチェンジを決意…</p>
            <p>■連絡先: masaki136928@gmail.com, Tel: 070-8943-2121 …</p>
          </div>
          
          <hr style={{ margin: '1rem 0' }} />
          <nav>
            <a href="/page2" style={{ color: '#cc0077' }}>
              ⇒ 次のページ (Page2) へ
            </a>
          </nav>
        </section>
      </main>
    </>
  )
}
