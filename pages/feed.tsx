// pages/feed.tsx
import React, { useEffect, useRef } from "react";
import Link from "next/link";

export default function FeedPage() {
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // CSS animation + JSで少しだけ制御
    const spark = sparkRef.current;
    if (spark) {
      spark.addEventListener("mouseover", () => {
        spark.classList.add("sparkActive");
      });
      spark.addEventListener("mouseleave", () => {
        spark.classList.remove("sparkActive");
      });
    }
  }, []);

  return (
    <div className="container">
      <h2 className="title">Feed</h2>
      <div ref={sparkRef} className="sparkleBox">
        ホバーできらめき演出
      </div>

      <p className="subtitle">ここに世界中の情報が集まります…</p>

      <nav className="navLinks">
        <Link href="/">← Home</Link>
      </nav>
    </div>
  );
}
