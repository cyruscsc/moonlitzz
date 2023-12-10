import { SleepAnalysis } from '@/components';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';

const Home = async () => {
  const session = await getServerSession(authOptions);
  return session ? <SleepAnalysis /> : <div>Not logged in</div>;
};

export default Home;
