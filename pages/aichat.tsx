// pages/aichat.tsx
import React from 'react'
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function AiChat() {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        minHeight: '80vh',
        // ▼ チャット欄を“もう少し下”にする
        //   例: 60px => 120pxにしてさらに下へ
        marginTop: '120px',
      }}
    >
      <div style={{
        maxWidth: '700px',
        width: '100%',
        padding: '20px',
      }}>
        <ChatGPTInterface />
      </div>
    </div>
  )
}
