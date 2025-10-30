import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="flex h-screen w-full items-center">{children}</div>
    </main>
  );
};

export default AuthLayout;
