'use client';

import { useSession } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Form, Input } from './basic';
import { UserResponseData } from '@/types/api.types';
import toast from 'react-hot-toast';
import { formChangeHandler } from '@/utils/handler';
import { endpoints } from '@/constants';

interface ProfileFormDataProps {
  email: string;
  name: string;
}

const ProfileForm = () => {
  const { data: session, update } = useSession();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
  } as ProfileFormDataProps);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      email: session?.user?.email || '',
      name: session?.user?.name || '',
    });
  }, [session]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(endpoints.user.update, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data: UserResponseData = await res.json();
      switch (data.status) {
        case 200:
          update({ name: formData.name });
          toast.success('User updated successfully!');
          break;
        case 401:
          toast.error('Unauthorized user!');
          break;
        case 404:
          toast.error('User not found!');
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
      toast.error('Cannot update user!');
    }
    setLoading(false);
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <Input
        type='email'
        id='email'
        name='email'
        value={formData.email}
        placeholder='Email'
        disabled={true}
        label='Email'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Input
        type='text'
        id='name'
        name='name'
        value={formData.name}
        placeholder='Name'
        label='Name'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Button type='submit' disabled={loading}>
        {loading ? 'Updating' : 'Update'}
      </Button>
    </Form>
  );
};

export default ProfileForm;
