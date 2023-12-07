'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button, Form, Input } from './basic';
import { formChangeHandler, formSubmitHandler } from '@/utils/handler';
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

  return (
    <Form
      handleSubmit={(e) =>
        formSubmitHandler({
          e,
          endpoint: endpoints.user.update,
          method: 'PUT',
          formData,
          setLoading,
          handleStatus: {
            200: () => update({ name: formData.name }),
          },
        })
      }
    >
      <Input
        type='email'
        name='email'
        value={formData.email}
        placeholder='Email'
        disabled={true}
        label='Email'
        handleChange={(e) => formChangeHandler({ e, formData, setFormData })}
      />
      <Input
        type='text'
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
