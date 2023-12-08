'use client';

import React from 'react';
import { Button, Modal } from './basic';
import { elementIds } from '@/constants';
import { ProfileDeleteButton } from '.';
import { modalCloseHandler } from '@/utils/handler';

const ProfileDeleteModal = () => {
  return (
    <Modal id={elementIds.modal.profileDelete} title='Delete Account'>
      <p>Are you sure you want to delete your account?</p>
      <p>This action cannot be undone.</p>
      <ProfileDeleteButton />
      <Button
        handleClick={() => modalCloseHandler(elementIds.modal.profileDelete)}
      >
        Cancel
      </Button>
    </Modal>
  );
};

export default ProfileDeleteModal;
