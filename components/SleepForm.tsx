'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from './basic';
import toast from 'react-hot-toast';
import { Sleep } from '@prisma/client';
import { formChangeHandler } from '@/utils/handler';
import { SleepResponseData } from '@/types/api.types';
import { endpoints } from '@/constants';

interface SleepFormProps {
  type: 'create' | 'update';
  sleepId?: string;
}

interface SleepFormDataProps {
  start: string; // date.toISOString().slice(0, 16) (2023-12-03T21:00)
  end: string; // date.toISOString().slice(0, 16) (2023-12-03T21:00)
  nightmare: boolean;
  wakeUp: boolean;
  sweat: boolean;
  note: string | null;
}

const SleepForm = ({ type, sleepId }: SleepFormProps) => {
  const [formData, setFormData] = useState({
    start: '',
    end: '',
    nightmare: false,
    wakeUp: false,
    sweat: false,
    note: '',
  } as SleepFormDataProps);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSleep = async () => {
      setLoading(true);
      const res = await fetch(`${endpoints.sleep.getOne}/${sleepId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: Sleep = await res.json();
      const { start, end, nightmare, wakeUp, sweat, note } = data;
      setFormData({ start, end, nightmare, wakeUp, sweat, note });
      setLoading(false);
    };
    try {
      {
        type === 'update' && getSleep();
      }
    } catch (error) {
      console.log(error);
      toast.error('Cannot get sleep data!');
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(endpoints.sleep.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data: SleepResponseData = await res.json();
      switch (data.status) {
        case 201:
          toast.success('Sleep created successfully!');
          break;
        case 401:
          toast.error('Unauthorized user!');
          break;
        case 500:
          toast.error('Internal server error! ' + data.error);
          break;
        default:
          toast.error('Something went wrong!');
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error('Cannot create sleep!');
    }
    setLoading(false);
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <Input
        type='datetime-local'
        id='start'
        name='start'
        value={formData.start}
        max={new Date().toISOString().slice(0, 16)}
        required={true}
        label='Start'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Input
        type='datetime-local'
        id='end'
        name='end'
        value={formData.end}
        max={new Date().toISOString().slice(0, 16)}
        required={true}
        label='End'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Checkbox
        id='nightmare'
        name='nightmare'
        checked={formData.nightmare}
        label='Nightmare'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Checkbox
        id='wakeUp'
        name='wakeUp'
        checked={formData.wakeUp}
        label='Wake-up'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Checkbox
        id='sweat'
        name='sweat'
        checked={formData.sweat}
        label='Sweat'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Input
        type='text'
        id='note'
        name='note'
        value={formData.note}
        label='Note'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Button type='submit' disabled={loading}>
        {type === 'create' && (loading ? 'Creating' : 'Create')}
        {type === 'update' && (loading ? 'Updating' : 'Update')}
      </Button>
    </Form>
  );
};

export default SleepForm;
