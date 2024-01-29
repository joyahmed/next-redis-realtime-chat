// import { getToken } from 'next-auth/jwt';
// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

// export default withAuth(
// 	async req => {
// 		const pathname = req.nextUrl.pathname;

// 		// Manage route protection
// 		const isAuthenticated = await getToken({ req });

// 		const isLoginPage = pathname.startsWith('/signin');

// 		const protectedRoutes = ['/dashboard'];
// 		const isAccessingProtectedRoutes = protectedRoutes.some(route =>
// 			pathname.startsWith(route)
// 		);

// 		if (isLoginPage) {
// 			if (isAuthenticated) {
// 				return NextResponse.redirect(new URL('/dashboard', req.url));
// 			}
// 			return NextResponse.next();
// 		}

// 		if (!isAuthenticated && isAccessingProtectedRoutes) {
// 			return NextResponse.redirect(new URL('/signin', req.url));
// 		}

// 		if (pathname === '/') {
// 			return NextResponse.redirect(new URL('/dashboard', req.url));
// 		}
// 	},
// 	{
// 		callbacks: {
// 			async authorized() {
// 				return true;
// 			}
// 		}
// 	}
// );

// export const config = {
// 	matcher: ['/', '/signin', '/dashboard/:path*']
// };
