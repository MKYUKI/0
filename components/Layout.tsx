// components/Layout.tsx
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer">X Clone</h1>
        </Link>
        <nav>
          {session ? (
            <div className="flex gap-4 items-center">
              <Link href="/profile">Profile</Link>
              <Link href="/feed">Feed</Link>
              <button onClick={() => signOut()}>Sign out</button>
            </div>
          ) : (
            <Link href="/auth/signin">Sign in</Link>
          )}
        </nav>
      </header>
      <main className="flex-1 p-4">{children}</main>
      <footer className="p-4 bg-gray-200 text-center">
        <p>X Clone &copy; 2025</p>
      </footer>
    </div>
  );
}
