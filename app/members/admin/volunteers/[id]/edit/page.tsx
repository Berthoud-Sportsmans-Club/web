import { notFound } from 'next/navigation'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { volunteerContacts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import EditVolunteerForm from './EditVolunteerForm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export default async function EditVolunteerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rows = await db.select().from(volunteerContacts).where(eq(volunteerContacts.id, Number(id))).limit(1)
  if (!rows[0]) notFound()

  return <EditVolunteerForm contact={rows[0]} />
}
