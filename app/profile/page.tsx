import { SessionData } from '@/components';
import ProfileDeleteButton from '@/components/ProfileDeleteButton';
import ProfileForm from '@/components/ProfileForm';

const Profile = () => {
  return (
    <div>
      Profile
      <SessionData />
      <ProfileForm />
      <ProfileDeleteButton />
    </div>
  );
};

export default Profile;
