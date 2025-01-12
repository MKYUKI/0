// pages/page4.tsx
import React from 'react';
import Head from 'next/head';
import GlobalLayout from '../layout/GlobalLayout';
import ChatGPTInterface from '../components/ChatGPTInterface';

import '../public/css/kaleido4.css';

export default function Page4() {
  return (
    <GlobalLayout>
      <Head>
        <title>Page4 | Advanced 3D + Transformer</title>
        <link rel="stylesheet" href="/css/kaleido4.css" />
      </Head>
      <section className="kaleidoMain4">
        <h2>MoE x Sparse Attention x 3D Visualization</h2>
        <p>
          Integrating the 2017 Attention Transformer with advanced 3D 
          WebGL techniques for an otherworldly experience.
        </p>
      </section>

      <div style={{ marginTop: '2rem', padding: '1rem' }}>
        <ChatGPTInterface />
      </div>
    </GlobalLayout>
  );
}
