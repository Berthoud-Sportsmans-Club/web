import { notFound } from 'next/navigation'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { admins } from '@/db/schema'
import { eq } from 'drizzle-orm'
import EditAdminForm from './EditAdminForm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export default async function EditAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rows = await db
    .select({ id: admins.id, username: admins.username })
    .from(admins)
    .where(eq(admins.id, Number(id)))
    .limit(1)
  if (!rows[0]) notFound()

  return <EditAdminForm admin={rows[0]} />
}
