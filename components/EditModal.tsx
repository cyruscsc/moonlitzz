import { elementIds } from '@/constants';
import { SleepForm } from '.';
import { Modal } from './basic';

interface EditModalProps {
  sleepId: string;
}

const EditModal = ({ sleepId }: EditModalProps) => (
  <Modal id={elementIds.modal.edit} title='Edit Sleep'>
    <SleepForm type='edit' sleepId={sleepId} />
  </Modal>
);

export default EditModal;
