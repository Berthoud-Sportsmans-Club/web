import { notFound } from 'next/navigation'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { boardMembers } from '@/db/schema'
import { eq } from 'drizzle-orm'
import EditBoardMemberForm from './EditBoardMemberForm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export default async function EditBoardMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rows = await db.select().from(boardMembers).where(eq(boardMembers.id, Number(id))).limit(1)
  if (!rows[0]) notFound()

  return <EditBoardMemberForm member={rows[0]} />
}
