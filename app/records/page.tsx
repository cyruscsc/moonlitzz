'use client';

import { ModalButton } from '@/components';
import { Accordion } from '@/components/basic';
import { elementIds, endpoints } from '@/constants';
import { SleepsResponseData } from '@/types/api.types';
import { Sleep } from '@prisma/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TK from '@/utils/timekeeper';
import EditModal from '@/components/EditModal';

const Records = () => {
  const [sleeps, setSleeps] = useState([] as Sleep[]);
  const [selectedSleep, setSelectedSleep] = useState('');

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
        setSleeps(data.sleeps.toReversed());
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
    <>
      <div>
        <h1>Records</h1>
        <div className='flex flex-col gap-3 py-3'>
          {sleeps.map((sleep) => (
            <Accordion
              key={sleep.id}
              title={`${TK.parseDate(sleep.start).month} ${
                TK.parseDate(sleep.start).day
              }, ${TK.parseDate(sleep.start).year} - ${
                TK.parseDate(sleep.end).month
              } ${TK.parseDate(sleep.end).day}, ${
                TK.parseDate(sleep.end).year
              }`}
              handleClick={(e) => setSelectedSleep(sleep.id)}
            >
              <div>
                <p>
                  Duration:{' '}
                  {`${TK.parseLength(sleep.duration).hour} hours ${
                    TK.parseLength(sleep.duration).minute
                  } minutes`}
                </p>
                <div className='flex gap-6'>
                  <span>
                    Bedtime:{' '}
                    {`${TK.parseDate(sleep.start).hour}:${
                      TK.parseDate(sleep.start).minute
                    }`}
                  </span>
                  <span>
                    Wakeup:{' '}
                    {`${TK.parseDate(sleep.end).hour}:${
                      TK.parseDate(sleep.end).minute
                    }`}
                  </span>
                </div>
                <div className='flex gap-3'>
                  <span>Nightmare: {sleep.nightmare ? 'yes' : 'no'}</span>
                  <span>Wake-up: {sleep.wakeUp ? 'yes' : 'no'}</span>
                  <span>Sweat: {sleep.sweat ? 'yes' : 'no'}</span>
                </div>
              </div>
              <ModalButton forId={elementIds.modal.edit}>Edit</ModalButton>
            </Accordion>
          ))}
        </div>
      </div>
      <EditModal sleepId={selectedSleep} />
    </>
  );
};

export default Records;
