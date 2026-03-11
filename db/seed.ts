import { config } from 'dotenv'
config({ path: '.env.local' })

import { put } from '@vercel/blob'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { documents, boardMembers, volunteerContacts } from './schema'
import { and, eq } from 'drizzle-orm'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

const BASE = 'https://berthoudsportsmansclub.org/wp-content/uploads'

type DocSeed = {
  title: string
  date: string // YYYY-MM-DD
  category: 'meeting_minutes' | 'form' | 'handbook'
  wpPath: string
}

const MINUTES: DocSeed[] = [
  { title: 'Meeting Minutes – March 13, 2012',          date: '2012-03-13', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2012-0313.pdf' },
  { title: 'Annual Meeting – April 10, 2012',           date: '2012-04-10', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2012-0410-Annual.pdf' },
  { title: 'Meeting Minutes – August 14, 2012',         date: '2012-08-14', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2012-0814.pdf' },
  { title: 'Meeting Minutes – February 12, 2013',       date: '2013-02-12', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2013-0212.pdf' },
  { title: 'Annual Meeting – April 9, 2013',            date: '2013-04-09', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2013-0409-Annual.pdf' },
  { title: 'Meeting Minutes – November 12, 2013',       date: '2013-11-12', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2013-1112.pdf' },
  { title: 'Annual Meeting – April 8, 2014',            date: '2014-04-08', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2014-0408-Annual.pdf' },
  { title: 'Meeting Minutes – June 10, 2014',           date: '2014-06-10', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2014-0610.pdf' },
  { title: 'Meeting Minutes – August 12, 2014',         date: '2014-08-12', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2014-0812.pdf' },
  { title: 'Meeting Minutes – November 11, 2014',       date: '2014-11-11', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2014-1111.pdf' },
  { title: 'Meeting Minutes – February 10, 2015',       date: '2015-02-10', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2015-0210.pdf' },
  { title: 'Meeting Minutes – March 10, 2015',          date: '2015-03-10', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2015-0310.pdf' },
  { title: 'Annual Meeting – April 14, 2015',           date: '2015-04-14', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2015-0414-Annual.pdf' },
  { title: 'Meeting Minutes – June 9, 2015',            date: '2015-06-09', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2015-0609.pdf' },
  { title: 'Meeting Minutes – August 11, 2015',         date: '2015-08-11', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2015-0811.pdf' },
  { title: 'Meeting Minutes – November 10, 2015',       date: '2015-11-10', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2015-1110.pdf' },
  { title: 'Meeting Minutes – February 9, 2016',        date: '2016-02-09', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2016-0209.pdf' },
  { title: 'Meeting Minutes – March 8, 2016',           date: '2016-03-08', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2016-0308.pdf' },
  { title: 'Annual Meeting – April 12, 2016',           date: '2016-04-12', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2016-0412-Annual.pdf' },
  { title: 'Meeting Minutes – June 14, 2016',           date: '2016-06-14', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2016-0614.pdf' },
  { title: 'Meeting Minutes – August 9, 2016',          date: '2016-08-09', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2016-0809.pdf' },
  { title: 'Meeting Minutes – November 8, 2016',        date: '2016-11-08', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2016-1108.pdf' },
  { title: 'Exec Board Meeting – January 15, 2017',     date: '2017-01-15', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2017-0115-Exec-BD-Dorrance.pdf' },
  { title: 'Meeting Minutes – February 21, 2017',       date: '2017-02-21', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2017-0221.pdf' },
  { title: 'Meeting Minutes – March 14, 2017',          date: '2017-03-14', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2017-0314.pdf' },
  { title: 'Annual Meeting – April 12, 2017',           date: '2017-04-12', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2017-0412-Annual.pdf' },
  { title: 'Meeting Minutes – June 3, 2017',            date: '2017-06-03', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2017-0603.pdf' },
  { title: 'Meeting Minutes – August 8, 2017',          date: '2017-08-08', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2017-0808.pdf' },
  { title: 'Meeting Minutes – November 4, 2017',        date: '2017-11-04', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2017-1104.pdf' },
  { title: 'Meeting Minutes – February 13, 2018',       date: '2018-02-13', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2018-0213.pdf' },
  { title: 'Meeting Minutes – March 13, 2018',          date: '2018-03-13', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2018-0313.pdf' },
  { title: 'Annual Meeting – April 10, 2018',           date: '2018-04-10', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2018-0410-Annual.pdf' },
  { title: 'Meeting Minutes – June 12, 2018',           date: '2018-06-12', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2018-0612.pdf' },
  { title: 'Meeting Minutes – August 14, 2018',         date: '2018-08-14', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2018-0814.pdf' },
  { title: 'Exec Board Meeting – August 16, 2018',      date: '2018-08-16', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2018-0816-Exec-BD.pdf' },
  { title: 'Meeting Minutes – February 12, 2019',       date: '2019-02-12', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2019-0212.pdf' },
  { title: 'Meeting Minutes – March 12, 2019',          date: '2019-03-12', category: 'meeting_minutes', wpPath: '2021/03/BSC-Minutes-2019-0312.pdf' },
  { title: 'Annual Meeting – April 13, 2021',           date: '2021-04-13', category: 'meeting_minutes', wpPath: '2021/06/BSC-Sec-report-for-4-13-21-annual-mtg.pdf' },
  { title: 'Meeting Minutes – June 8, 2021',            date: '2021-06-08', category: 'meeting_minutes', wpPath: '2021/07/BSC-Minutes-2021-0608.pdf' },
  { title: 'Meeting Minutes – July 30, 2021',           date: '2021-07-30', category: 'meeting_minutes', wpPath: '2021/08/BSC-Minutes-2021-0730.pdf' },
  { title: 'Meeting Minutes – August 10, 2021',         date: '2021-08-10', category: 'meeting_minutes', wpPath: '2021/09/BSC-Minutes-2021-0810.pdf' },
  { title: 'Exec Board Meeting – October 25, 2021',     date: '2021-10-25', category: 'meeting_minutes', wpPath: '2022/02/BSC-Minutes-2021-1025-Exec-BD.pdf' },
  { title: 'Meeting Minutes – November 9, 2021',        date: '2021-11-09', category: 'meeting_minutes', wpPath: '2022/02/BSC-Minutes-2021-1109.pdf' },
  { title: 'Meeting Minutes – February 8, 2022',        date: '2022-02-08', category: 'meeting_minutes', wpPath: '2022/04/BSC-Minutes-2022-0208.pdf' },
  { title: 'Meeting Minutes – March 8, 2022',           date: '2022-03-08', category: 'meeting_minutes', wpPath: '2022/04/BSC-Minutes-2022-0308.pdf' },
  { title: 'Annual Meeting – April 12, 2022',           date: '2022-04-12', category: 'meeting_minutes', wpPath: '2022/04/BSC-Annual-Meeting-4-12-2022.pdf' },
  { title: 'Meeting Minutes – June 14, 2022',           date: '2022-06-14', category: 'meeting_minutes', wpPath: '2022/06/BSC-Minutes-2022-0614.pdf' },
  { title: 'Meeting Minutes – August 9, 2022',          date: '2022-08-09', category: 'meeting_minutes', wpPath: '2023/01/BSC-Minutes-2022-0809.pdf' },
  { title: 'Meeting Minutes – November 8, 2022 (Revised)', date: '2022-11-08', category: 'meeting_minutes', wpPath: '2023/03/BSC-Minutes-2022-1108-revised.pdf' },
  { title: 'Meeting Minutes – February 21, 2023',       date: '2023-02-21', category: 'meeting_minutes', wpPath: '2023/03/BSC-Minutes-2023-0221.pdf' },
  { title: 'Meeting Minutes – March 14, 2023',          date: '2023-03-14', category: 'meeting_minutes', wpPath: '2023/04/BSC-2023-0314-Meeting-Minutes.pdf' },
  { title: 'Annual Meeting – April 11, 2023',           date: '2023-04-11', category: 'meeting_minutes', wpPath: '2023/06/Meeting-Notes-BSC-Annual-Meeting-4-11-2023.pdf' },
  { title: 'Meeting Minutes – June 13, 2023',           date: '2023-06-13', category: 'meeting_minutes', wpPath: '2023/07/BCS-Minutes-2023-0613.pdf' },
  { title: 'Meeting Minutes – August 8, 2023',          date: '2023-08-08', category: 'meeting_minutes', wpPath: '2024/03/BSC-Meeting-Minutes-2023-0808.pdf' },
  { title: 'Meeting Minutes – September 7, 2023',       date: '2023-09-07', category: 'meeting_minutes', wpPath: '2024/03/BSC-Meeting-Minutes-2023-0907.pdf' },
  { title: 'Meeting Minutes – November 17, 2023',       date: '2023-11-17', category: 'meeting_minutes', wpPath: '2024/03/BSC-Meeting-Minutes-2023-1117.pdf' },
  { title: 'Meeting Minutes – February 13, 2024',       date: '2024-02-13', category: 'meeting_minutes', wpPath: '2024/03/BSC-Meeting-Minutes-2024-0213.pdf' },
  { title: 'Meeting Minutes – March 12, 2024',          date: '2024-03-12', category: 'meeting_minutes', wpPath: '2024/03/BSC-Meeting-Minutes-2024-0312.pdf' },
  { title: 'Annual Meeting – April 9, 2024',            date: '2024-04-09', category: 'meeting_minutes', wpPath: '2024/05/BSC-Minutes-2024-0409-\u2013-Annual-Meeting.pdf' },
  { title: 'Meeting Minutes – June 11, 2024',           date: '2024-06-11', category: 'meeting_minutes', wpPath: '2024/06/BSC-Meeting-Minutes-2024-0611.pdf' },
  { title: 'Meeting Minutes – February 21, 2025',       date: '2025-02-21', category: 'meeting_minutes', wpPath: '2025/02/BSC-Meeting-Minutes-2025-0221.pdf' },
  { title: 'Annual Meeting – April 8, 2025',            date: '2025-04-08', category: 'meeting_minutes', wpPath: '2025/05/BSC-Minutes-2025-0408-Annual-Meeting.pdf' },
]

const OTHER_DOCS: DocSeed[] = [
  { title: 'Member Handbook (May 2022)',      date: '2022-05-10', category: 'handbook', wpPath: '2022/05/BSC-Handbook-10May22.pdf' },
  { title: 'Fish Management Plan',           date: '2022-04-01', category: 'handbook', wpPath: '2022/04/Fish-Management-Plan.pdf' },
  { title: 'Catch Report Form',              date: '2021-03-01', category: 'form',     wpPath: '2021/03/catch-report-form.pdf' },
  { title: 'Membership Sponsorship Form',    date: '2021-05-01', category: 'form',     wpPath: '2021/05/Sponsorship-Form.pdf' },
  { title: 'Guest Liability Waiver',         date: '2023-07-01', category: 'form',     wpPath: '2023/07/BSC-Liability-Waiver-for-Guests.pdf' },
]

const ALL_DOCS = [...MINUTES, ...OTHER_DOCS]

const BOARD_MEMBERS = [
  { name: 'Mike Conrey',         role: 'President',            department: null,          phone: '970-214-3165', sortOrder: 1 },
  { name: 'Kraig Patriquin',     role: 'Vice President',       department: null,          phone: '719-649-9320', sortOrder: 2 },
  { name: 'James Massie',        role: 'Secretary',            department: null,          phone: '970-775-5088', sortOrder: 3 },
  { name: 'LaDon Kee',           role: 'Treasurer',            department: null,          phone: '303-591-4855', sortOrder: 4 },
  { name: 'Brent Grimditch',     role: 'Maintenance Director', department: 'Maintenance', phone: '303-579-4764', sortOrder: 5 },
  { name: 'Jim Roper',           role: 'Fishing Director',     department: 'Fishing',     phone: '303-522-7393', sortOrder: 6 },
  { name: 'Bruce Vander Linden', role: 'Hunting Director',     department: 'Hunting',     phone: '970-492-5955', sortOrder: 7 },
]

const VOLUNTEERS = [
  { program: 'Lake Maintenance', director: 'Michael Haley', phone: '515-779-7150', email: 'haleymichael@gmail.com' },
  { program: 'Fish Program',     director: 'Jim Roper',     phone: '303-522-7393', email: 'chincoisldboy@gmail.com' },
  { program: 'Hunting Program',  director: 'David Johnson', phone: '720-350-2568', email: 'davejohns@msn.com' },
]

async function seedDoc(doc: DocSeed) {
  // Skip if already in DB
  const existing = await db
    .select({ id: documents.id })
    .from(documents)
    .where(and(eq(documents.title, doc.title), eq(documents.date, doc.date)))
    .limit(1)

  if (existing.length > 0) {
    console.log(`  skip  ${doc.title}`)
    return
  }

  const wpUrl = `${BASE}/${doc.wpPath}`
  const res = await fetch(wpUrl)
  if (!res.ok) {
    console.warn(`  WARN  ${res.status} downloading ${wpUrl}`)
    return
  }

  const filename = doc.wpPath.replace(/\//g, '-')
  const blob = await put(`bsc-docs/${filename}`, res.body!, {
    access: 'public',
    contentType: 'application/pdf',
    allowOverwrite: true,
  })

  await db.insert(documents).values({
    title: doc.title,
    date: doc.date,
    category: doc.category,
    blobUrl: blob.url,
  })

  console.log(`  done  ${doc.title}`)
}

async function main() {
  console.log('\n=== Seeding documents ===')
  // Run in batches of 5 to avoid overwhelming the origin server
  for (let i = 0; i < ALL_DOCS.length; i += 5) {
    await Promise.all(ALL_DOCS.slice(i, i + 5).map(seedDoc))
  }

  console.log('\n=== Seeding board members ===')
  for (const m of BOARD_MEMBERS) {
    const existing = await db
      .select({ id: boardMembers.id })
      .from(boardMembers)
      .where(eq(boardMembers.name, m.name))
      .limit(1)
    if (existing.length > 0) {
      console.log(`  skip  ${m.name}`)
      continue
    }
    await db.insert(boardMembers).values(m)
    console.log(`  done  ${m.name}`)
  }

  console.log('\n=== Seeding volunteer contacts ===')
  for (const v of VOLUNTEERS) {
    const existing = await db
      .select({ id: volunteerContacts.id })
      .from(volunteerContacts)
      .where(eq(volunteerContacts.program, v.program))
      .limit(1)
    if (existing.length > 0) {
      console.log(`  skip  ${v.program}`)
      continue
    }
    await db.insert(volunteerContacts).values(v)
    console.log(`  done  ${v.program}`)
  }

  console.log('\nSeed complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
