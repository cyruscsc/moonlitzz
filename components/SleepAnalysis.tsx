'use client';

import { endpoints } from '@/constants';
import { SleepsResponseData } from '@/types/api.types';
import { Sleep } from '@prisma/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TimeInBedCard } from '.';
import { Loading } from './basic';

const SleepAnalysis = () => {
  const [sleeps, setSleeps] = useState([] as Sleep[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSleeps = async () => {
      setLoading(true);
      const res = await fetch(`${endpoints.sleep.getAll}?take=30`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: SleepsResponseData = await res.json();
      if (data.sleeps) {
        setSleeps(data.sleeps);
      }
      setLoading(false);
    };
    try {
      getSleeps();
    } catch (error) {
      console.log(error);
      toast.error('Cannot get sleeps data!');
    }
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading &&
        (sleeps.length === 0 ? (
          <div>
            <p>Create your first sleep!</p>
          </div>
        ) : (
          <TimeInBedCard sleeps={sleeps} />
        ))}
    </>
  );
};

export default SleepAnalysis;
