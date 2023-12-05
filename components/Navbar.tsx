import { routes } from '@/constants';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={routes.home}>- Home</Link>
        </li>
        <li>
          <Link href={routes.profile}>- Profile</Link>
        </li>
        <li>
          <Link href={routes.records}>- Records</Link>
        </li>
        <li>
          <Link href={routes.createSleep}>- Create Sleep</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
