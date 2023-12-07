import { elementIds } from '@/constants';
import { SleepForm } from '.';
import { Modal } from './basic';

const CreateModal = () => (
  <Modal id={elementIds.modal.create} title='Create Sleep'>
    <SleepForm type='create' />
  </Modal>
);

export default CreateModal;
