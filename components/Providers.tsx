// components/Providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { Theme } from '@radix-ui/themes';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Theme appearance="dark">{children}</Theme>
    </SessionProvider>
  );
}
