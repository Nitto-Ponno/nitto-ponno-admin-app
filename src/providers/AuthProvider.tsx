'use client';

import React from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const token = Cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME as string);

  if (token) {
    return <>{children}</>;
  } else {
    router.push('/auth/login');
  }
};

export default AuthProvider;
