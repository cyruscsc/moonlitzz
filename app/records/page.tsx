'use client';

import { SleepCard } from '@/components';
import { endpoints } from '@/constants';
import { SleepsResponseData } from '@/types/api.types';
import { Sleep } from '@prisma/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Records = () => {
  const [sleeps, setSleeps] = useState([] as Sleep[]);

  useEffect(() => {
    const getSleeps = async () => {
      const res = await fetch(endpoints.sleep.getAll, {
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

  return (
    <div>
      <h1>Records</h1>
      {sleeps.map((sleep) => (
        <SleepCard
          key={sleep.id}
          sleep={sleep}
          sleeps={sleeps}
          setSleeps={setSleeps}
        />
      ))}
    </div>
  );
};

export default Records;
