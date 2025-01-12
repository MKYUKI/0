// components/ReferencesDropdown.tsx
import React, { useState } from 'react';

/**
 * ドロップダウンで著作権表記・参考文献を表示するコンポーネント
 */
export default function ReferencesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="references-dropdown">
      {/* トリガーボタン */}
      <button onClick={toggleDropdown} className="references-button">
        {isOpen ? '▲ References & Copyright' : '▼ References & Copyright'}
      </button>

      {/* ドロップダウン本体 */}
      {isOpen && (
        <div className="references-content">
          <p style={{ margin: '1rem 0' }}>
            <strong>This project is inspired by ChatGPT (OpenAI)</strong> <br />
            Reference: 
            <a href="https://chat.openai.com/" target="_blank" rel="noreferrer">
              https://chat.openai.com/
            </a>{' '}
            /{' '}
            <a href="https://chatgpt.com/c/677f3cea-9d94-8000-be2e-a3571ea7a84b" target="_blank" rel="noreferrer">
              https://chatgpt.com/c/677f3cea-9d94-8000-be2e-a3571ea7a84b
            </a>
          </p>

          <p style={{ marginBottom: '1rem' }}>
            We would like to express our gratitude to OpenAI for providing the inspiration for the design, 
            user experience, and advanced language model features (GPT-4.0).
          </p>

          <p>
            <strong>Also referencing:</strong>
            <ul>
              <li>
                Vaswani et al. (2017). "Attention Is All You Need."
                <br />
                <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
                  [arXiv:1706.03762]
                </a>
              </li>
              <li>
                Brown et al. (2020). "Language Models are Few-Shot Learners."
                <br />
                <a href="https://arxiv.org/abs/2005.14165" target="_blank" rel="noreferrer">
                  [arXiv:2005.14165]
                </a>
              </li>
              <li>(その他参照した論文やリンクを適宜追加)</li>
            </ul>
          </p>

          <hr style={{ margin: '1rem 0' }} />

          <p style={{ fontSize: '0.9rem' }}>
            <em>
              Note: This source code does NOT contain any direct copy of ChatGPT's original source code,
              but is an independent implementation that recreates a similar interface and functionality.
            </em>
          </p>
        </div>
      )}
    </div>
  );
}
