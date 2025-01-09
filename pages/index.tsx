// pages/index.tsx (Home / Page1)
import React from 'react';
import Head from 'next/head';

export default function Page1() {
  return (
    <>
      <Head>
        <title>Legendary Website - Page1 (Home)</title>
      </Head>
      <main style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Page1 (Home)</h1>
        <p>This is the home page. Animations are loaded from /js/*.js</p>
      </main>
    </>
  );
}
