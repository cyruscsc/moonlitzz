import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import { AuthButton } from '.';

const SessionData = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <AuthButton provider='google'>{session ? 'Logout' : 'Login'}</AuthButton>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

export default SessionData;
