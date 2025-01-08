// src/app/page.tsx

"use client";  // App Routerでクライアントコンポーネントとして動かす場合

import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ color: "blue" }}>
        Next.js 13 + React 18 / Test Page
      </h1>

      {/* ここで next/image を正しく利用 */}
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={200}
        height={40}
        priority
      />

      <p style={{ marginTop: 20 }}>
        If you see this page without build errors, the "Image" component is working!
      </p>
    </div>
  );
}
