import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { documents } from '@/db/schema'
import { eq } from 'drizzle-orm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('bsc_admin')?.value === '1'
}

export async function GET(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const rows = category
    ? await db.select().from(documents).where(eq(documents.category, category)).orderBy(documents.date)
    : await db.select().from(documents).orderBy(documents.date)

  return NextResponse.json(rows)
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const form = await request.formData()
  const file = form.get('file') as File | null
  const title = form.get('title') as string
  const date = form.get('date') as string
  const category = form.get('category') as string

  if (!file || !title || !date || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const blob = await put(`bsc-docs/${Date.now()}-${file.name}`, file, {
    access: 'public',
    contentType: file.type || 'application/pdf',
    allowOverwrite: false,
  })

  const [row] = await db.insert(documents).values({ title, date, category, blobUrl: blob.url }).returning()
  return NextResponse.json(row, { status: 201 })
}
