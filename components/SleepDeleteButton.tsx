'use client';

import { Dispatch, useState } from 'react';
import { Button, Loading } from './basic';
import { elementIds, endpoints } from '@/constants';
import toast from 'react-hot-toast';
import { SleepResponseData } from '@/types/api.types';
import { Sleep } from '@prisma/client';
import { modalCloseHandler } from '@/utils/handler';

export interface SleepDeleteButtonProps {
  sleepId: string;
  sleeps: Sleep[];
  setSleeps: Dispatch<React.SetStateAction<Sleep[]>>;
}

const SleepDeleteButton = ({
  sleepId,
  sleeps,
  setSleeps,
}: SleepDeleteButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${endpoints.sleep.delete}/${sleepId}`, {
        method: 'DELETE',
      });
      const data: SleepResponseData = await res.json();
      switch (data.status) {
        case 200:
          setSleeps(sleeps.filter((sleep) => sleep.id !== sleepId));
          data.message && toast.success(data.message);
          break;
        case 400:
          data.error && toast.error(data.error);
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
    } catch (error) {
      toast.error('Something went wrong!');
    }
    setLoading(false);
    modalCloseHandler(elementIds.modal.delete);
  };

  return (
    <Button
      type='button'
      style='warning'
      disabled={loading}
      handleClick={handleClick}
    >
      {loading ? <Loading /> : 'Delete'}
    </Button>
  );
};

export default SleepDeleteButton;
