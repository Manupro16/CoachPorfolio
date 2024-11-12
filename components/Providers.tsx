// components/Providers.tsx

'use client';

import { SessionProvider } from 'next-auth/react';
import { Theme } from '@radix-ui/themes';
import React from 'react';
import { AuthProvider } from '@/components/AuthContext';
import { Session } from 'next-auth';

export default function Providers({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      <AuthProvider session={session}>
        <Theme appearance="dark">{children}</Theme>
      </AuthProvider>
    </SessionProvider>
  );
}
