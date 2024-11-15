// /middleware.ts

import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/story/edit/:path*', '/admin/:path*'],
};

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Get the relative path and query string
    const callbackUrl = `${req.nextUrl.pathname}${req.nextUrl.search}`;
    // Redirect unauthenticated users to sign-in page with a callbackUrl parameter
    const signInUrl = new URL(`/auth/signin`, req.nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', callbackUrl);
    signInUrl.searchParams.set('error', 'unauthenticated');
    return NextResponse.redirect(signInUrl);
  }

  if (token.role !== 'ADMIN') {
    // Redirect unauthorized users to 403 error page
    const forbiddenUrl = new URL('/403', req.nextUrl.origin);
    forbiddenUrl.searchParams.set('reason', 'no-permission');
    return NextResponse.redirect(forbiddenUrl);
  }

  return NextResponse.next();
};
