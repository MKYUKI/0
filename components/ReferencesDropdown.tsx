// components/ReferencesDropdown.tsx
import React, { useState } from 'react'

export default function ReferencesDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={() => setOpen(!open)}>
        {open ? 'Hide References' : 'Show References'}
      </button>
      {open && (
        <div
          style={{
            marginTop: '0.5rem',
            padding: '1rem',
            border: '1px solid #ccc',
            background: '#fafafa'
          }}
        >
          <ul>
            <li><a href="https://chatgpt.com/" target="_blank" rel="noreferrer">chatgpt.com</a></li>
            <li><a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
              Attention Is All You Need (2017)
            </a></li>
            {/* など */}
          </ul>
        </div>
      )}
    </div>
  )
}
