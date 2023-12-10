import { elementIds, routes } from '@/constants';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { AuthButton, ModalButton } from '.';
import {
  MdOutlineHome,
  MdOutlineBed,
  MdOutlineAddBox,
  MdOutlinePerson,
  MdLogin,
} from 'react-icons/md';

const BottomNav = async () => {
  const session = await getServerSession(authOptions);
  return session ? (
    <nav className='btm-nav md:hidden border-t border-neutral'>
      <Link href={routes.home}>
        <div className='text-2xl'>
          <MdOutlineHome />
        </div>
      </Link>
      <ModalButton forId={elementIds.modal.create}>
        <div className='text-2xl'>
          <MdOutlineAddBox />
        </div>
      </ModalButton>
      <Link href={routes.records}>
        <div className='text-2xl'>
          <MdOutlineBed />
        </div>
      </Link>
      <ModalButton forId={elementIds.modal.profile}>
        <div className='text-2xl'>
          <MdOutlinePerson />
        </div>
      </ModalButton>
    </nav>
  ) : (
    <nav className='btm-nav md:hidden border-t border-neutral'>
      <AuthButton provider='google'>
        <div className='text-2xl'>
          <MdLogin />
        </div>
      </AuthButton>
    </nav>
  );
};

export default BottomNav;
