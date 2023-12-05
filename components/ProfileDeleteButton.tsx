'use client';

import { useState } from 'react';
import { Button } from './basic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { endpoints } from '@/constants';
import { UserResponseData } from '@/types/api.types';

const ProfileDeleteButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch(endpoints.user.delete, {
      method: 'DELETE',
    });
    const data: UserResponseData = await res.json();
    switch (data.status) {
      case 200:
        const signOutData = await signOut({
          redirect: false,
          callbackUrl: '/',
        });
        router.push(signOutData.url);
        data.message && toast.success(data.message);
        break;
      case 401:
        data.error && toast.error(data.error);
        break;
      case 404:
        data.error && toast.error(data.error);
        break;
      case 500:
        data.error && toast.error(data.error);
        break;
      default:
        toast.error('Something went wrong!');
        break;
    }
    setLoading(false);
  };
  return (
    <Button type='button' disabled={loading} handleClick={handleClick}>
      {loading ? 'Deleting...' : 'Delete Account'}
    </Button>
  );
};

export default ProfileDeleteButton;
