'use client';

import { Button, Modal } from './basic';
import { elementIds } from '@/constants';
import { ProfileDeleteButton } from '.';
import { modalCloseHandler } from '@/utils/handler';

const ProfileDeleteModal = () => {
  return (
    <Modal id={elementIds.modal.profileDelete} title='Delete Account'>
      <div className='flex flex-col gap-3'>
        <div>
          <p>Are you sure you want to delete your account?</p>
          <p>This action cannot be undone.</p>
        </div>
        <div className='flex justify-end gap-3'>
          <Button
            handleClick={() =>
              modalCloseHandler(elementIds.modal.profileDelete)
            }
          >
            Go back
          </Button>
          <ProfileDeleteButton />
        </div>
      </div>
    </Modal>
  );
};

export default ProfileDeleteModal;
