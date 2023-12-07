import { elementIds } from '@/constants';
import { Modal } from './basic';
import { ProfileForm } from '.';

const ProfileModal = () => (
  <Modal id={elementIds.modal.profile} title='Profile'>
    <ProfileForm />
  </Modal>
);

export default ProfileModal;
