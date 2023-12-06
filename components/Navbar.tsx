import { routes } from '@/constants';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { AuthButton } from '.';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className='hidden md:navbar bg-base-100'>
      <div className='flex-1'>
        <Link href={routes.home}>
          <Image src='/moon.png' alt='Logo' width={48} height={48} />
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <details>
              <summary>Sleeps</summary>
              <ul className='p-2 bg-base-100 rounded-t-none'>
                <li>
                  <Link href={routes.createSleep}>Create</Link>
                </li>
                <li>
                  <Link href={routes.records}>Records</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            {session ? (
              <Link href={routes.profile}>Profile</Link>
            ) : (
              <AuthButton provider='google'>Login</AuthButton>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
