'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button, Form, Input, Loading } from './basic';
import {
  formChangeHandler,
  formSubmitHandler,
  modalOpenHandler,
} from '@/utils/handler';
import { elementIds, endpoints } from '@/constants';
import { AuthButton, ProfileDeleteButton } from '.';

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
      <div className='flex justify-between gap-3 mt-3'>
        <button
          type='button'
          onClick={() => modalOpenHandler(elementIds.modal.profileDelete)}
          className='text-accent text-xs'
        >
          Delete account
        </button>
        <div className='flex justify-end gap-3'>
          <Button type='submit' disabled={loading}>
            {loading ? <Loading /> : 'Update'}
          </Button>
          <AuthButton provider='google'>Logout</AuthButton>
        </div>
      </div>
    </Form>
  );
};

export default ProfileForm;
