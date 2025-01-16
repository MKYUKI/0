// components/AttentionPopup.tsx
import React from 'react'

export default function AttentionPopup(): JSX.Element {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="attention-popup-container">
      <button className="attention-popup-btn" onClick={() => setOpen(!open)}>
        {open ? 'Hide Transformer' : 'Show Transformer'}
      </button>
      {open && (
        <div className="attention-popup-content">
          <h4 style={{ marginBottom: '0.3rem' }}>
            Attention Is All You Need (2017)
          </h4>
          <p style={{ fontSize: '0.88rem', lineHeight: '1.4' }}>
            Visualize multi-head attention or see how Q-K-V are computed in real-time.
            <br />
            <a
              href="https://arxiv.org/abs/1706.03762"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#66ffcc', textDecoration: 'underline' }}
            >
              [arXiv:1706.03762]
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
