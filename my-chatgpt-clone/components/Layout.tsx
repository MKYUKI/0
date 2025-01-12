// components/Layout.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div style={{ margin: "0 auto", maxWidth: 800, padding: 16 }}>
      {/* ここに共通ヘッダーなど */}
      {children}
    </div>
  );
}
