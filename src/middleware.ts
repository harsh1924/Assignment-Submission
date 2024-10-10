import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup'

  const cookie = cookies()
  const token = cookie.get('token')?.value || ''
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // PUBLIC PAGES
    
    '/login',
    '/signup',

    // PRIVATE PAGES
    '/profile/:path*',
    '/dashboard/:path*',
  ]
}