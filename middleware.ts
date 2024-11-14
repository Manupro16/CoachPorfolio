// /middleware.ts

import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextMiddleware } from 'next/server';

export const config = {
  matcher: ['/story/edit/:path*', '/admin/:path*'],
};

export const middleware: NextMiddleware = async (req: NextRequest) => {
// Retrieve the token (session)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Redirect unauthenticated users to sign-in page
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.url);
      signInUrl.searchParams.set('error', 'unauthenticated');
    return NextResponse.redirect(signInUrl);
  }

  if (token.role !== 'ADMIN') {
    // Redirect unauthorized users to 403 error page
    const forbiddenUrl = new URL('/403', req.url);
    forbiddenUrl.searchParams.set('reason', 'no-permission');
    return NextResponse.redirect(forbiddenUrl);
  }

  // Continue to the requested page
  return NextResponse.next();
};
