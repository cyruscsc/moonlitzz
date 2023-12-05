'use client';

import { SleepForm } from '@/components';
import { useParams } from 'next/navigation';

const Edit = () => {
  const params = useParams();
  return (
    <div>
      <SleepForm type='edit' sleepId={params.id as string} />
    </div>
  );
};

export default Edit;
