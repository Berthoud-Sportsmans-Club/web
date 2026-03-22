import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ChangePasswordForm from './ChangePasswordForm'
import { getAuthenticatedAdmin } from '@/lib/admin-auth'

export default async function ChangePasswordPage() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) redirect('/members/admin')

  const cookieStore = await cookies()
  const required = cookieStore.get('bsc_admin_pwchange')?.value === '1'
  return <ChangePasswordForm required={required} email={admin.email} />
}
