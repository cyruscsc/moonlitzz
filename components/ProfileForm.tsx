'use client';

import { useSession } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
import { Button } from '.';
import { UserResponseData } from '@/types/api.types';
import toast from 'react-hot-toast';

interface ProfileFormProps {
  email: string;
  name: string;
}

const ProfileForm = () => {
  const { data: session, update } = useSession();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
  } as ProfileFormProps);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      email: session?.user?.email || '',
      name: session?.user?.name || '',
    });
  }, [session]);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = (await res.json()) as UserResponseData;
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
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Email'
        name='email'
        value={formData.email}
        disabled
      />
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={formData.name}
        onChange={handleChange}
      />
      <Button type='submit' loading={loading}>
        {loading ? 'Updating' : 'Update'}
      </Button>
    </form>
  );
};

export default ProfileForm;
