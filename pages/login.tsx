// pages/login.tsx
import { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

// 背景アニメーション用のグローバル型宣言
declare global {
  interface Window {
    startGalaxyArtSim?: () => void;
    startRotatingGalaxies?: () => void;
    startArtStars?: () => void;
    startArtNebula?: () => void;
  }
}

// 「getLayout」を含む NextPage の拡張型
type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

const LoginPage: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 認証済みならホームへリダイレクト
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // 背景アニメーションの初期化
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.startGalaxyArtSim?.();
      window.startRotatingGalaxies?.();
      window.startArtStars?.();
      window.startArtNebula?.();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login - Cosmic Portal</title>
        <meta
          name="description"
          content="Log in with Google to enter the Cosmic Portal."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        id="login-wrapper"
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {/* 背景キャンバス */}
        <canvas
          id="galaxy-art-canvas"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <canvas
          id="rotating-galaxies-canvas"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <canvas
          id="art-stars-canvas"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <canvas
          id="art-nebula-canvas"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        {/* ログインボタン */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            textAlign: "center",
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "8px",
          }}
        >
          <h1 style={{ color: "#fff", marginBottom: "20px" }}>
            Welcome to Cosmic Portal
          </h1>
          <button
            onClick={() => signIn("google")}
            style={{
              backgroundColor: "#0070f3",
              border: "none",
              padding: "12px 24px",
              color: "#fff",
              fontSize: "1rem",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            Sign in with Google
          </button>
        </div>
        {/* アニメーション用スクリプトの読み込み */}
        <Script
          src="/js/galaxyArtSim.js"
          strategy="afterInteractive"
          onLoad={() => window.startGalaxyArtSim?.()}
        />
        <Script
          src="/js/rotatingGalaxies.js"
          strategy="afterInteractive"
          onLoad={() => window.startRotatingGalaxies?.()}
        />
        <Script
          src="/js/artStars.js"
          strategy="afterInteractive"
          onLoad={() => window.startArtStars?.()}
        />
        <Script
          src="/js/artNebula.js"
          strategy="afterInteractive"
          onLoad={() => window.startArtNebula?.()}
        />
      </div>
    </>
  );
};

// このページ専用のレイアウト設定（共通レイアウトを付与しない）
LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default LoginPage;
