// pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';

// グローバルCSS(例: tailwind or your own)
import '../styles/globals.css'; 

// ここにChatGPTInterfaceを組み込み、全ページで表示する
import ChatGPTInterface from '../components/ChatGPTInterface';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 量子的幾何学線 */}
        <link rel="stylesheet" href="/css/globalQuantum.css" />

        {/* 全ページ共通のwaveAnim & starsAnim (必要なら) */}
        <script src="/js/waveAnim.js" defer />
        <script src="/js/starsAnim.js" defer />
      </Head>

      {/* 幾何学黒線アニメ背景 */}
      <div className="quantumGeometryBG">
        <div className="globalContainerWrap">
          {/* ヘッダー */}
          <header className="globalHeader" style={{ background: 'rgba(255,255,255,0.85)', padding: '1rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
              【量子×ChatGPT】 世界最高峰のプラットフォーム
            </h1>
          </header>

          {/* ナビゲーション */}
          <nav style={{ padding: '0.5rem', background: '#eee', textAlign: 'center' }}>
            <a href="/">Home(Page1)</a> |{' '}
            <a href="/page2">Page2</a> |{' '}
            <a href="/page3">Page3</a> |{' '}
            <a href="/page4">Page4</a> |{' '}
            <a href="/page5">Page5</a> |{' '}
            <a href="/page6">Page6</a>
          </nav>

          {/* 全ページ共通のChatGPT Search: 下 or 上に固定など好みで */}
          <section style={{ padding: '1rem', background: 'rgba(255,255,255,0.6)' }}>
            <h2 style={{ textAlign: 'center' }}>全ページ共通 ChatGPT Search</h2>
            <ChatGPTInterface />
          </section>

          {/* ページごとの内容 */}
          <Component {...pageProps} />

          {/* フッター */}
          <footer className="globalFooter" style={{ padding: '1rem', textAlign: 'center' }}>
            <p>©2024 Legendary Website | 量子的次世代プラットフォーム</p>
          </footer>
        </div>
      </div>
    </>
  );
}
