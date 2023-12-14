'use client';

import { SleepDeleteModal } from '@/components';
import { Accordion, Button } from '@/components/basic';
import { elementIds, endpoints } from '@/constants';
import { SleepsResponseData } from '@/types/api.types';
import { Sleep } from '@prisma/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TK from '@/utils/timekeeper';
import EditModal from '@/components/EditModal';
import { modalOpenHandler } from '@/utils/handler';

const Records = () => {
  const [sleeps, setSleeps] = useState([] as Sleep[]);
  const [selectedSleep, setSelectedSleep] = useState('');
  const [moreToShow, setMoreToShow] = useState(false);

  useEffect(() => {
    try {
      getSleeps(0);
    } catch (error) {
      console.log(error);
      toast.error('Cannot get sleeps data!');
    }
  }, []);

  const getSleeps = async (skip: number) => {
    const res = await fetch(
      `${endpoints.sleep.getAll}?skip=${skip}&order=desc`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data: SleepsResponseData = await res.json();
    if (!data.sleeps) return;
    setSleeps([...sleeps, ...data.sleeps]);
    if (data.sleeps.length >= endpoints.options.take) {
      setMoreToShow(true);
    } else {
      setMoreToShow(false);
    }
  };

  const handleShowMore = () => {
    try {
      getSleeps(sleeps.length);
    } catch (error) {
      console.log(error);
      toast.error('Cannot get sleeps data!');
    }
  };

  return sleeps.length === 0 ? (
    <div>
      <p>Create your first sleep!</p>
    </div>
  ) : (
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
                    wakeup:{' '}
                    {`${TK.parseDate(sleep.end).hour}:${
                      TK.parseDate(sleep.end).minute
                    }`}
                  </span>
                </div>
                <div className='flex gap-3'>
                  <span>Nightmare: {sleep.nightmare ? 'yes' : 'no'}</span>
                  <span>Wake-up: {sleep.wakeup ? 'yes' : 'no'}</span>
                  <span>Sweat: {sleep.sweat ? 'yes' : 'no'}</span>
                </div>
              </div>
              <div className='flex gap-3'>
                <Button
                  type='button'
                  handleClick={() => modalOpenHandler(elementIds.modal.edit)}
                >
                  Edit
                </Button>
                <Button
                  type='button'
                  style='warning'
                  handleClick={() => modalOpenHandler(elementIds.modal.delete)}
                >
                  Delete
                </Button>
              </div>
            </Accordion>
          ))}
        </div>
        <div className='flex justify-center'>
          {moreToShow ? (
            <Button type='button' handleClick={handleShowMore}>
              Show more
            </Button>
          ) : (
            <p>You've reached the bottom!</p>
          )}
        </div>
      </div>
      <EditModal sleepId={selectedSleep} />
      <SleepDeleteModal
        sleepId={selectedSleep}
        sleeps={sleeps}
        setSleeps={setSleeps}
      />
    </>
  );
};

export default Records;
