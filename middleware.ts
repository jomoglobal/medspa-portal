import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Check if user is accessing customer routes
    if (path.startsWith('/customer')) {
      if (token?.role !== 'customer') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }

    // Check if user is accessing employee routes
    if (path.startsWith('/employee')) {
      if (token?.role !== 'employee') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/customer/:path*', '/employee/:path*'],
};
