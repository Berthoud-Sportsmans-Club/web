import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { neon } from '@neondatabase/serverless'

async function getMemberHash(): Promise<string | null> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT value FROM settings WHERE key = 'member_code' LIMIT 1`
    const code = rows[0]?.value as string | undefined
    if (!code) return null
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code))
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const memberCookie = request.cookies.get('bsc_member')?.value
  const isAdmin = request.cookies.get('bsc_admin')?.value === '1'
  const mustChangePw = request.cookies.get('bsc_admin_pwchange')?.value === '1'

  // Validate member session by comparing cookie hash to current member_code hash.
  // Fails open (treats as valid) if DB is unreachable, to avoid locking everyone out.
  let isMember = false
  if (memberCookie) {
    const expectedHash = await getMemberHash()
    isMember = expectedHash === null ? memberCookie.length === 64 : memberCookie === expectedHash
  }

  // Admin sub-routes: require bsc_admin
  if (pathname.startsWith('/members/admin/')) {
    if (!isAdmin) return NextResponse.redirect(new URL('/members/admin', request.url))
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

  // Member login page: clear stale cookie if present, then let through
  if (pathname === '/members') {
    if (isMember) return NextResponse.redirect(new URL('/members/dashboard', request.url))
    if (memberCookie && !isMember) {
      const response = NextResponse.next()
      response.cookies.delete('bsc_member')
      return response
    }
    return NextResponse.next()
  }

  // All other /members/* routes: require valid member session
  if (!isMember) {
    const response = NextResponse.redirect(new URL('/members', request.url))
    if (memberCookie) response.cookies.delete('bsc_member')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/members', '/members/:path+'],
}
