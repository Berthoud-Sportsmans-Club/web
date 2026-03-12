import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdmin = request.cookies.get('bsc_admin')?.value === '1'
  const isMember = request.cookies.get('bsc_member')?.value === '1'
  const mustChangePw = request.cookies.get('bsc_admin_pwchange')?.value === '1'

  // Admin sub-routes: require bsc_admin
  if (pathname.startsWith('/members/admin/')) {
    if (!isAdmin) return NextResponse.redirect(new URL('/members/admin', request.url))
    // Force password change before accessing anything else
    if (mustChangePw && pathname !== '/members/admin/change-password') {
      return NextResponse.redirect(new URL('/members/admin/change-password', request.url))
    }
    return NextResponse.next()
  }

  // Admin login page: redirect to dashboard if already admin
  if (pathname === '/members/admin') {
    if (isAdmin) return NextResponse.redirect(new URL('/members/admin/dashboard', request.url))
    return NextResponse.next()
  }

  // Member login page: redirect to dashboard if already a member
  if (pathname === '/members') {
    if (isMember) return NextResponse.redirect(new URL('/members/dashboard', request.url))
    return NextResponse.next()
  }

  // All other /members/* routes: require bsc_member
  if (!isMember) {
    return NextResponse.redirect(new URL('/members', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/members', '/members/:path+'],
}
