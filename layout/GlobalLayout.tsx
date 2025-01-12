// layout/GlobalLayout.tsx
import React from 'react';

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="root-container">
      {/* 背景キャンバス: 3層(3D, 星, 波) */}
      <canvas id="bg-canvas" className="bg-canvas-layer"></canvas>
      <canvas id="stars-canvas" className="bg-canvas-layer"></canvas>
      <canvas id="wave-canvas" className="bg-canvas-layer"></canvas>

      {/* コンテンツ部分 */}
      <main style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
