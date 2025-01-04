// src/components/SignInButton.tsx
import React from 'react';
import { signIn, useSession } from 'next-auth/react';

const SignInButton: React.FC = () => {
  const { data: session } = useSession();
  if (session) return null;

  return (
    <button onClick={() => signIn('google')}>
      Googleログイン
    </button>
  );
};

export default SignInButton;
