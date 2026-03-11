import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete('bsc_admin')
  cookieStore.delete('bsc_admin_pwchange')
  cookieStore.delete('bsc_admin_user')
  return NextResponse.json({ ok: true })
}
