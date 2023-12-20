'use client';

import { SleepDeleteModal } from '@/components';
import { Accordion, Button, Loading } from '@/components/basic';
import { elementIds, endpoints } from '@/constants';
import { SleepsResponseData } from '@/types/api.types';
import { Sleep } from '@prisma/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TK from '@/utils/timekeeper';
import EditModal from '@/components/EditModal';
import { modalOpenHandler } from '@/utils/handler';
import {
  MdAccessTimeFilled,
  MdBedtime,
  MdError,
  MdModeComment,
} from 'react-icons/md';

const Records = () => {
  const [sleeps, setSleeps] = useState([] as Sleep[]);
  const [selectedSleep, setSelectedSleep] = useState('');
  const [moreToShow, setMoreToShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    try {
      getSleeps(0);
    } catch (error) {
      console.log(error);
      toast.error('Cannot get sleeps data!');
    }
  }, []);

  const getSleeps = async (skip: number) => {
    skip ? setLoadingMore(true) : setLoading(true);
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
    skip ? setLoadingMore(false) : setLoading(false);
  };

  const handleShowMore = () => {
    try {
      getSleeps(sleeps.length);
    } catch (error) {
      console.log(error);
      toast.error('Cannot get sleeps data!');
    }
  };

  return (
    <>
      {loading && <Loading />}
      {!loading &&
        (sleeps.length === 0 ? (
          <div>
            <p>Create your first sleep!</p>
          </div>
        ) : (
          <>
            <div>
              <h1 className='font-medium text-xl text-center'>Sleep Records</h1>
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
                    <article className='flex flex-col gap-3'>
                      <div className='flex flex-col gap-1 text-neutral-400'>
                        <div className='flex items-center gap-3'>
                          <MdAccessTimeFilled />
                          <span>
                            {`${TK.parseLength(sleep.duration).hour} hrs ${
                              TK.parseLength(sleep.duration).minute
                            } mins`}
                          </span>
                        </div>
                        <div className='flex gap-6'>
                          <div className='flex items-center gap-3'>
                            <MdBedtime />
                            <span>
                              {`${TK.parseDate(sleep.start).hour}:${
                                TK.parseDate(sleep.start).minute
                              } - ${TK.parseDate(sleep.end).hour}:${
                                TK.parseDate(sleep.end).minute
                              }`}
                            </span>
                          </div>
                        </div>
                        {(sleep.nightmare || sleep.wakeup || sleep.sweat) && (
                          <div className='flex items-center gap-3'>
                            <MdError />
                            <div className='event-list'>
                              {sleep.nightmare && <span>Nightmare</span>}
                              {sleep.wakeup && <span>Wakeup</span>}
                              {sleep.sweat && <span>Sweat</span>}
                            </div>
                          </div>
                        )}
                        {sleep.note && (
                          <div className='flex items-center gap-3'>
                            <MdModeComment />
                            <span>{sleep.note}</span>
                          </div>
                        )}
                      </div>
                      <div className='flex gap-3'>
                        <Button
                          type='button'
                          handleClick={() =>
                            modalOpenHandler(elementIds.modal.edit)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          type='button'
                          style='warning'
                          handleClick={() =>
                            modalOpenHandler(elementIds.modal.delete)
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </article>
                  </Accordion>
                ))}
              </div>
              <div className='flex justify-center py-3'>
                {moreToShow ? (
                  <Button
                    type='button'
                    handleClick={handleShowMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? <Loading /> : 'Show more'}
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
        ))}
    </>
  );
};

export default Records;
