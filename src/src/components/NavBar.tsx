// src/components/NavBar.tsx
import React from 'react';
import Link from 'next/link';
import SignInButton from './SignInButton';
import { useSession } from 'next-auth/react';

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Link href="/">
        ホーム
      </Link>
      {session && (
        <>
          <Link href="/profile">プロフィール</Link>
          <Link href={`/users/${(session.user as any)?.id}`}>マイページ</Link>
        </>
      )}
      <SignInButton />
    </nav>
  );
}
