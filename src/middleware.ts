import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const isAuthenticated = await getToken({ req });

    const isSignInPage = pathname.includes('/signin');
    const isAccessingProtectedRoutes = pathname.includes('/dashboard');


    if (isSignInPage) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticated && isAccessingProtectedRoutes) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    if (pathname === '/' ) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/signin', req.url));
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);


export const config = {
	matcher: ['/', '/signin', '/dashboard/:path*']
};
