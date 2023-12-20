'use client';

import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Loading } from './basic';
import toast from 'react-hot-toast';
import {
  formChangeHandler,
  formSubmitHandler,
  modalCloseHandler,
} from '@/utils/handler';
import { SleepResponseData } from '@/types/api.types';
import { elementIds, endpoints, routes } from '@/constants';
import { useRouter } from 'next/navigation';
import TK from '@/utils/timekeeper';

interface SleepFormProps {
  type: 'create' | 'edit';
  sleepId?: string;
}

interface SleepFormDataProps {
  start: string; // ISO (2023-12-03T21:00)
  end: string; // ISO (2023-12-03T21:00)
  duration: number; // in sec
  nightmare: boolean;
  wakeup: boolean;
  sweat: boolean;
  note: string | null;
}

const SleepForm = ({ type, sleepId }: SleepFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    start: '',
    end: '',
    duration: 0,
    nightmare: false,
    wakeup: false,
    sweat: false,
    note: '',
  } as SleepFormDataProps);
  const [loading, setLoading] = useState(false);

  const getSleep = async () => {
    setLoading(true);
    const res = await fetch(`${endpoints.sleep.getOne}/${sleepId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: SleepResponseData = await res.json();
    if (data.sleep) {
      const { start, end, duration, nightmare, wakeup, sweat, note } =
        data.sleep;
      setFormData({ start, end, duration, nightmare, wakeup, sweat, note });
    }
    setLoading(false);
  };

  useEffect(() => {
    try {
      {
        type === 'edit' && sleepId && getSleep();
      }
    } catch (error) {
      console.log(error);
      toast.error('Cannot get sleep data!');
    }
  }, []);

  useEffect(() => {
    try {
      {
        type === 'edit' && sleepId && getSleep();
      }
    } catch (error) {
      console.log(error);
      toast.error('Cannot get sleep data!');
    }
  }, [sleepId]);

  useEffect(() => {
    if (formData.start && formData.end) {
      const startDate = TK.parseDate(formData.start).epoch;
      const endDate = TK.parseDate(formData.end).epoch;
      const duration = TK.findLength(startDate, endDate).lengthInSec;
      setFormData({ ...formData, duration });
    }
  }, [formData.start, formData.end]);

  return (
    <Form
      handleSubmit={(e) => {
        formSubmitHandler({
          e,
          endpoint:
            type === 'create'
              ? endpoints.sleep.create
              : `${endpoints.sleep.update}/${sleepId}`,
          method: type === 'create' ? 'POST' : 'PUT',
          formData,
          setLoading,
          handleStatus: {
            200: () => router.push(routes.records),
            201: () => router.push(routes.records),
          },
        });
        modalCloseHandler(
          type === 'create' ? elementIds.modal.create : elementIds.modal.edit
        );
      }}
    >
      <Input
        type='datetime-local'
        name='start'
        value={formData.start}
        max={formData.end || new Date().toISOString().slice(0, 16)}
        required={true}
        label='Start'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Input
        type='datetime-local'
        name='end'
        value={formData.end}
        min={formData.start}
        max={new Date().toISOString().slice(0, 16)}
        required={true}
        label='End'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Input
        type='text'
        name='duration'
        value={`${TK.parseLength(formData.duration).hour} hours ${
          TK.parseLength(formData.duration).minute
        } minutes`}
        label='Duration'
        disabled={true}
      />
      <Checkbox
        name='nightmare'
        checked={formData.nightmare}
        label='Nightmare'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Checkbox
        name='wakeup'
        checked={formData.wakeup}
        label='Wake-up'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Checkbox
        name='sweat'
        checked={formData.sweat}
        label='Sweat'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Input
        type='text'
        name='note'
        maxLength={100}
        value={formData.note}
        label='Note'
        help='Max 100 characters'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <div className='flex justify-end mt-3'>
        <Button
          type='submit'
          disabled={
            loading ||
            formData.duration <= 0 ||
            (formData.note?.length as number) > 100
          }
        >
          {type === 'create' && (loading ? <Loading /> : 'Create')}
          {type === 'edit' && (loading ? <Loading /> : 'Update')}
        </Button>
      </div>
    </Form>
  );
};

export default SleepForm;
