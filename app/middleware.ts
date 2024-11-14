// middleware.ts

import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextMiddleware } from 'next/server';

// Define routes that require authentication
const protectedRoutes = ['/story/edit'];

export const middleware: NextMiddleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Retrieve the token (session)
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check if token exists and has user role
    if (!token || token.role !== 'ADMIN') {
      const signInUrl = new URL('/auth/signin', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Continue to the requested page
  return NextResponse.next();
};
