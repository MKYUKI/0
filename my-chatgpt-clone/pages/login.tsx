// pages/login.tsx
import React from 'react';
import Head from 'next/head';

export default function LoginPage() {
  const handleLogin = () => {
    alert("Login logic is not implemented. This is a placeholder.");
  };

  return (
    <>
      <Head>
        <title>Legendary Website - Login</title>
      </Head>
      <main style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Login Page</h1>
        <button onClick={handleLogin}>Login</button>
      </main>
    </>
  );
}
