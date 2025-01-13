// components/ReferencesDropdown.tsx
import React, { useState } from 'react'

export default function ReferencesDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ marginTop:'2rem', textAlign:'center' }}>
      <button
        style={{
          background:'#000', color:'#fff',
          border:'none', borderRadius:'4px', padding:'0.5rem 1rem',
          cursor:'pointer'
        }}
        onClick={()=>setOpen(!open)}
      >
        { open ? 'Hide References' : 'Show References' }
      </button>
      {open && (
        <div style={{
          marginTop:'1rem', background:'#fefefe', border:'1px solid #ccc',
          borderRadius:'4px', textAlign:'left', padding:'1rem',
          maxWidth:'600px', margin:'1rem auto', fontSize:'0.95rem'
        }}>
          <h3>Key References</h3>
          <ul>
            <li>
              <a
                href="https://arxiv.org/abs/1706.03762"
                target="_blank" rel="noreferrer"
              >
                Attention Is All You Need (2017)
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2106.01345"
                target="_blank" rel="noreferrer"
              >
                Scaling Laws for Neural Language Models
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2003.08934"
                target="_blank" rel="noreferrer"
              >
                NeRF: Representing Scenes as Neural Radiance Fields
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2112.10752"
                target="_blank" rel="noreferrer"
              >
                Latent Diffusion Models
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/1701.06538"
                target="_blank" rel="noreferrer"
              >
                Sparsely-Gated Mixture-of-Experts
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
