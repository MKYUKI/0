// components/ReferencesDropdown.tsx
import React, { useState } from 'react'

export default function ReferencesDropdown() {
  const [open, setOpen] = useState(false)
  return (
    <div className="references-dropdown">
      <button 
        onClick={() => setOpen(!open)} 
        className="references-button"
      >
        {open ? '▲ References & Copyright' : '▼ References & Copyright'}
      </button>

      {open && (
        <div className="references-content">
          <p>
            <strong>This project is inspired by ChatGPT (OpenAI)</strong>
            <br />
            Reference: 
            <a 
              href="https://chat.openai.com/" 
              target="_blank" 
              rel="noreferrer"
            >
              https://chat.openai.com/
            </a>
            {' '} / {' '}
            <a 
              href="https://chatgpt.com/c/677f3cea-9d94-8000-be2e-a3571ea7a84b" 
              target="_blank" 
              rel="noreferrer"
            >
              https://chatgpt.com/c/677f3cea-9d94-8000-be2e-a3571ea7a84b
            </a>
          </p>
          <p>
            We express gratitude to OpenAI for design & LLM features (GPT-4.0).
          </p>

          <p><strong>Also referencing:</strong></p>
          <ul>
            <li>
              Vaswani et al. (2017). 
              <em>"Attention Is All You Need."</em> 
              <br />
              <a 
                href="https://arxiv.org/abs/1706.03762" 
                target="_blank" 
                rel="noreferrer"
              >
                [arXiv:1706.03762]
              </a>
            </li>
            <li>
              Brown et al. (2020). 
              <em>"Language Models are Few-Shot Learners."</em>
              <br />
              <a 
                href="https://arxiv.org/abs/2005.14165" 
                target="_blank" 
                rel="noreferrer"
              >
                [arXiv:2005.14165]
              </a>
            </li>
            <li>
              (その他参照した論文やリンクを適宜追加)
            </li>
          </ul>

          <hr style={{ margin: '1rem 0' }} />
          <p style={{ fontSize: '0.9rem' }}>
            <em>
              Note: This source code does NOT contain any direct copy of ChatGPT's 
              original source code, but is an independent implementation 
              that recreates a similar interface & functionality.
            </em>
          </p>
        </div>
      )}
    </div>
  )
}
