// pages/auth/signup.tsx
import React, { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    if (res.ok) {
      alert("SignUp success. Please sign in.");
    } else {
      const data = await res.json();
      alert("Error: " + data.error);
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "80px auto" }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
