// components/ReferencesDropdown.tsx
import React from 'react'

export default function ReferencesDropdown() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="references-dropdown" style={{ textAlign: 'center', marginTop: '1rem' }}>
      <button
        style={{
          background: '#444',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          fontSize: '0.9rem',
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Hide References' : 'Show References'}
      </button>
      {open && (
        <div
          className="references-content"
          style={{
            marginTop: '0.5rem',
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '600px',
            margin: '0.5rem auto',
          }}
        >
          <p>Some references for AI research, quantum lines, synergy, etc.</p>
          <ul style={{ textAlign: 'left', marginLeft: '1rem', lineHeight: '1.6' }}>
            <li>
              <a
                href="https://arxiv.org/abs/1706.03762"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#66ffcc', textDecoration: 'underline' }}
              >
                Attention Is All You Need (2017)
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2003.08934"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#66ffcc', textDecoration: 'underline' }}
              >
                NeRF (2020)
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2106.01345"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#66ffcc', textDecoration: 'underline' }}
              >
                Scaling Laws
              </a>
            </li>
            <li>
              <strong style={{ color: '#ffbfff' }}>Reference: chatgpt.com</strong>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
