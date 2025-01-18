// pages/contact.tsx
import React from 'react'

export default function Contact() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '80vh',
        // もし余白が大きすぎるなら marginTop 減らす
        marginTop: '40px', 
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h2>Contact Information</h2>
        <p style={{ marginTop: '1rem' }}>
          If you have any inquiries, feel free to email me at:
        </p>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
          <a
            href="mailto:masaki136928@gmail.com"
            style={{ textDecoration: 'none', color: '#0066cc' }}
          >
            masaki136928@gmail.com
          </a>
        </p>
        <p style={{ marginTop: '2rem' }}>
          Or find me on social networks:
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          <a
            href="https://x.com/MK_ASI1"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'underline', color: '#0066cc' }}
          >
            X
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/MKYUKI"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'underline', color: '#0066cc', marginLeft: '0.5rem' }}
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  )
}
