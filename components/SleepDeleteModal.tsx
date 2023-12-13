'use client';

import { elementIds } from '@/constants';
import { Button, Modal } from './basic';
import { modalCloseHandler } from '@/utils/handler';
import { SleepDeleteButton } from '.';
import { SleepDeleteButtonProps } from './SleepDeleteButton';

const SleepDeleteModal = (props: SleepDeleteButtonProps) => {
  return (
    <Modal id={elementIds.modal.delete} title='Delete Sleep'>
      <div className='flex flex-col gap-3'>
        <div>
          <p>Are you sure you want to delete this sleep record?</p>
          <p>This action cannot be undone.</p>
        </div>
        <div className='flex justify-end gap-3'>
          <Button
            handleClick={() => modalCloseHandler(elementIds.modal.delete)}
          >
            Go back
          </Button>
          <SleepDeleteButton {...props} />
        </div>
      </div>
    </Modal>
  );
};

export default SleepDeleteModal;
