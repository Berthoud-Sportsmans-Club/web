import { pgTable, serial, text, date, timestamp, integer, boolean } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  date: date('date').notNull(),
  category: text('category').notNull(), // 'meeting_minutes' | 'form' | 'handbook'
  blobUrl: text('blob_url').notNull(),
  createdAt: timestamp('created_at').default(sql`now()`),
})

export const boardMembers = pgTable('board_members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  department: text('department'), // null for officers; 'Maintenance' | 'Fishing' | 'Hunting' for directors
  phone: text('phone'),
  sortOrder: integer('sort_order').notNull(),
})

export const volunteerContacts = pgTable('volunteer_contacts', {
  id: serial('id').primaryKey(),
  program: text('program').notNull(), // 'Lake Maintenance' | 'Fish Program' | 'Hunting Program'
  director: text('director').notNull(),
  phone: text('phone'),
  email: text('email'),
})

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  mustChangePassword: boolean('must_change_password').notNull().default(false),
  createdAt: timestamp('created_at').default(sql`now()`),
})
