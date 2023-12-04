'use client';

import { useState } from 'react';
import { Button } from './basic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const ProfileDeleteButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch('/api/user', {
      method: 'DELETE',
    });
    const data = await res.json();
    switch (data.status) {
      case 200:
        const signOutData = await signOut({
          redirect: false,
          callbackUrl: '/',
        });
        router.push(signOutData.url);
        toast.success('User deleted successfully!');
        break;
      case 401:
        toast.error('Unauthorized user!');
        break;
      case 404:
        toast.error('User not found!');
        break;
      case 500:
        toast.error('Internal server error! ' + data.error);
        break;
      default:
        toast.error('Something went wrong!');
        break;
    }
    setLoading(false);
  };
  return (
    <Button type='button' loading={loading} handleClick={handleClick}>
      {loading ? 'Deleting...' : 'Delete Account'}
    </Button>
  );
};

export default ProfileDeleteButton;
