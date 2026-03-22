import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { hashMemberCode } from '@/lib/member-auth'

async function getMemberHash(): Promise<string | null> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT value FROM settings WHERE key = 'member_code' LIMIT 1`
    const code = rows[0]?.value as string | undefined
    if (!code) return null
    return await hashMemberCode(code)
  } catch {
    return null
  }
}

async function isValidAdminSession(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT id FROM admins WHERE session_token = ${token} LIMIT 1`
    return rows.length > 0
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const memberCookie = request.cookies.get('bsc_member')?.value
  const adminToken = request.cookies.get('bsc_admin')?.value
  const isAdmin = await isValidAdminSession(adminToken)
  const mustChangePw = request.cookies.get('bsc_admin_pwchange')?.value === '1'

  // Admin sub-routes: require bsc_admin — no member hash check needed
  if (pathname.startsWith('/members/admin/')) {
    if (!isAdmin) return NextResponse.redirect(new URL('/members/admin', request.url))
    if (mustChangePw && pathname !== '/members/admin/change-password') {
      return NextResponse.redirect(new URL('/members/admin/change-password', request.url))
    }
    return NextResponse.next()
  }

  // Admin login page: redirect to dashboard if already admin — no member hash check needed
  if (pathname === '/members/admin') {
    if (isAdmin) return NextResponse.redirect(new URL('/members/admin/dashboard', request.url))
    return NextResponse.next()
  }

  // For all remaining /members routes, validate the member session hash.
  // Fails closed: if the DB is unreachable, the cookie is treated as invalid.
  let isMember = false
  if (memberCookie) {
    const expectedHash = await getMemberHash()
    isMember = expectedHash !== null && memberCookie === expectedHash
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
