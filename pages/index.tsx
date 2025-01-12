// pages/index.tsx
import Head from 'next/head';
import React from 'react';
import GlobalLayout from '../layout/GlobalLayout';
import ChatGPTInterface from '../components/ChatGPTInterface';

// 個別ページ用CSS
import '../public/css/kaleido1.css';

export default function HomePage() {
  return (
    <GlobalLayout>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 | MasakiKusaka - Portfolio & Resume</title>
        <link rel="stylesheet" href="/css/kaleido1.css" />
      </Head>

      <section style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>MasakiKusaka 日下真旗: Portfolio + Resume</h1>
        <p style={{ margin: '1rem 0' }}>
          Welcome to the world's most advanced quantum-infused portfolio. 
          Experience futuristic 3D animations and an AI chatbot interface 
          powered by GPT-4.0 (inspired by ChatGPT).
        </p>

        {/* 履歴書ダウンロード */}
        <h3>Resume & Career History (Word/PDF)</h3>
        <div style={{ margin: '1rem 0' }}>
          <a
            href="/docs/MasakiKusaka_Resume.docx"
            download
            style={{ marginRight: '1rem' }}
          >
            Resume (Word)
          </a>
          <a href="/docs/MasakiKusaka_Resume.pdf" download>
            Resume (PDF)
          </a>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <a
            href="/docs/MasakiKusaka_CareerHistory.docx"
            download
            style={{ marginRight: '1rem' }}
          >
            CareerHistory (Word)
          </a>
          <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>
            CareerHistory (PDF)
          </a>
        </div>

        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
          <em>
            Leverage the unstoppable synergy of fractal illusions & 
            multi-head self-attention. "Attention is All You Need" (2017).
          </em>
        </p>
      </section>

      {/* 下部に ChatGPT Search 風インターフェースを配置 */}
      <div style={{ padding: '1rem 2rem' }}>
        <h2 style={{ textAlign: 'center' }}>AI Chat Interface (GPT-4.0)</h2>
        <ChatGPTInterface />
      </div>
    </GlobalLayout>
  );
}
