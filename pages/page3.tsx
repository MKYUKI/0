// pages/page3.tsx
import Head from 'next/head';
import React from 'react';
import GlobalLayout from '../layout/GlobalLayout';
import ChatGPTInterface from '../components/ChatGPTInterface';

// 3ページ目の個別CSS
import '../public/css/kaleido3.css';

export default function Page3() {
  return (
    <GlobalLayout>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page3 | Cutting-Edge Tech & Resume</title>
        <link rel="stylesheet" href="/css/kaleido3.css"/>
      </Head>

      <section className="kaleidoMain3">
        <h2>Cutting-edge Papers & Tech References</h2>
        <p>
          Behold the apex of civilization with sparse gating, MoE, and 
          attention-based breakthroughs at your fingertips.
        </p>

        <ul className="paper-list">
          <li>
            Vaswani et al. (2017). "Attention Is All You Need."
            <br />
            <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
              arXiv:1706.03762
            </a>
          </li>
          <li>
            Brown et al. (2020). "Language Models are Few-Shot Learners."
            <br />
            <a href="https://arxiv.org/abs/2005.14165" target="_blank" rel="noreferrer">
              arXiv:2005.14165
            </a>
          </li>
          <li>
            (その他の世界最先端論文を多数追記)
          </li>
        </ul>

        <h3>Resume & Career Documents</h3>
        <p>
          <a href="/docs/MasakiKusaka_Resume.docx" download>Download Resume (Word)</a> |{' '}
          <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume (PDF)</a>
        </p>
        <p>
          <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Download CareerHistory (Word)</a> |{' '}
          <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>CareerHistory (PDF)</a>
        </p>
      </section>

      {/* 下部チャットUI */}
      <div style={{ marginTop: '2rem', padding: '1rem' }}>
        <ChatGPTInterface />
      </div>
    </GlobalLayout>
  );
}
