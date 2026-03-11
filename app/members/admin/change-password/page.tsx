import { cookies } from 'next/headers'
import ChangePasswordForm from './ChangePasswordForm'

export default async function ChangePasswordPage() {
  const cookieStore = await cookies()
  const required = cookieStore.get('bsc_admin_pwchange')?.value === '1'
  const username = cookieStore.get('bsc_admin_user')?.value ?? ''
  return <ChangePasswordForm required={required} username={username} />
}
