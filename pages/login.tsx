// pages/login.tsx
import React, { useEffect } from "react";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("[Login] Status:", status);
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <>
      <Head>
        <title>Login - Cosmic Portal</title>
        <meta
          name="description"
          content="Log in with Google to enter the cosmic portal."
        />
      </Head>
      <div
        id="login-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000",
        }}
      >
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
    </>
  );
}