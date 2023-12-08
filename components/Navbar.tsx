import { elementIds, routes } from '@/constants';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { AuthButton, CreateModal, ModalButton, ProfileModal } from '.';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav className='hidden md:navbar bg-base-100'>
        <div className='flex-1'>
          <Link href={routes.home}>
            <Image src='/moon.png' alt='Logo' width={48} height={48} />
          </Link>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1'>
            {session && (
              <li>
                <details>
                  <summary>Sleeps</summary>
                  <ul className='p-2 bg-base-100 rounded-t-none z-10'>
                    <li>
                      <ModalButton forId={elementIds.modal.create}>
                        Create
                      </ModalButton>
                    </li>
                    <li>
                      <Link href={routes.records}>Records</Link>
                    </li>
                  </ul>
                </details>
              </li>
            )}
            <li>
              {session ? (
                <ModalButton forId={elementIds.modal.profile}>
                  Profile
                </ModalButton>
              ) : (
                <AuthButton provider='google'>Login</AuthButton>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <CreateModal />
      <ProfileModal />
    </>
  );
};

export default Navbar;
