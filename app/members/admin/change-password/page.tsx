import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ChangePasswordForm from './ChangePasswordForm'

export default async function ChangePasswordPage() {
  const cookieStore = await cookies()
  const username = cookieStore.get('bsc_admin_user')?.value

  if (!username) redirect('/members/admin')

  const required = cookieStore.get('bsc_admin_pwchange')?.value === '1'
  return <ChangePasswordForm required={required} username={username} />
}
