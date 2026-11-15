import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileClient from '@/Components/ProfileClient';

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in?message=login_required');
  }

  return <ProfileClient user={session.user} />;
}
