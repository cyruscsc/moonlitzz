'use client';

import { endpoints } from '@/constants';
import { SleepsResponseData } from '@/types/api.types';
import { Sleep } from '@prisma/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TimeInBedCard } from '.';

const SleepAnalysis = () => {
  const [sleeps, setSleeps] = useState([] as Sleep[]);

  useEffect(() => {
    const getSleeps = async () => {
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
    };
    try {
      getSleeps();
    } catch (error) {
      console.log(error);
      toast.error('Cannot get sleeps data!');
    }
  }, []);
  return sleeps.length === 0 ? (
    <div>
      <p>Create your first sleep!</p>
    </div>
  ) : (
    <TimeInBedCard sleeps={sleeps} />
  );
};

export default SleepAnalysis;
