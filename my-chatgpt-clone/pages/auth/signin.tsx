// pages/auth/signin.tsx
import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/feed", // ログイン後のリダイレクト先
    });
  }

  return (
    <div style={{ maxWidth: 360, margin: "80px auto" }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Sign In</button>
      </form>
      <hr />
      <button onClick={() => signIn("google")}>Sign In with Google</button>
    </div>
  );
}
