import { elementIds } from '@/constants';
import { Modal } from './basic';
import { ProfileDeleteModal, ProfileForm } from '.';

const ProfileModal = () => (
  <Modal id={elementIds.modal.profile} title='Profile'>
    <ProfileForm />
    <ProfileDeleteModal />
  </Modal>
);

export default ProfileModal;
