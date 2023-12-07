import { routes } from '@/constants';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { AuthButton } from '.';
import Image from 'next/image';

const BottomNav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className='btm-nav md:hidden'>
      <Link href={routes.home}>
        <Image src='/moon.png' alt='Logo' width={32} height={32} />
      </Link>
      <a>Create</a>
      <Link href={routes.records}>Records</Link>
      {session ? (
        <a>Profile</a>
      ) : (
        <AuthButton provider='google'>Login</AuthButton>
      )}
    </nav>
  );
};

export default BottomNav;
