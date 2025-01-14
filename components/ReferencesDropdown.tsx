// components/ReferencesDropdown.tsx
import React from 'react'

export default function ReferencesDropdown() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="references-dropdown" style={{ textAlign: 'center', marginTop: '1rem' }}>
      <button
        className="references-button"
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: '#f0f0f0',
          color: '#333',
          border: '1px solid #ccc',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {open ? 'Hide References' : 'Show References'}
      </button>

      {open && (
        <div
          className="references-content"
          style={{
            marginTop: '1rem',
            background: '#fafafa',
            border: '1px solid #ccc',
            borderRadius: '4px',
            textAlign: 'left',
            padding: '1rem',
            maxWidth: '600px',
            margin: '1rem auto',
            fontSize: '0.95rem'
          }}
        >
          <p>Some references for AI research, quantum lines, synergy, etc.</p>
          <ul>
            <li>
              <a
                href="https://arxiv.org/abs/1706.03762"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#0066cc', textDecoration: 'underline' }}
              >
                Attention Is All You Need (2017)
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2003.08934"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#0066cc', textDecoration: 'underline' }}
              >
                NeRF (2020)
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2106.01345"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#0066cc', textDecoration: 'underline' }}
              >
                Scaling Laws
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
