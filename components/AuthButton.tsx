'use client';

import { ReactNode } from 'react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { signIn, signOut, useSession } from 'next-auth/react';

interface AuthButtonProps {
  provider: BuiltInProviderType;
  children?: ReactNode;
}

const AuthButton = ({ provider, children }: AuthButtonProps) => {
  const { data: session, status } = useSession();
  return (
    <button
      type='button'
      disabled={status === 'loading'}
      onClick={() => (session ? signOut() : signIn(provider))}
      className='text-sm'
    >
      {children}
    </button>
  );
};

export default AuthButton;
