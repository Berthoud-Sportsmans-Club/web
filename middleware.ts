import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('bsc_member')?.value === '1'
  const isLoginPage = request.nextUrl.pathname === '/members'

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/members/dashboard', request.url))
  }

  if (!isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/members', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/members', '/members/:path+'],
}
