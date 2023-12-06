import { Sleep } from '@prisma/client';
import { Card } from './basic';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants';
import { Dispatch } from 'react';

interface SleepCardProps {
  sleep: Sleep;
  sleeps: Sleep[];
  setSleeps: Dispatch<React.SetStateAction<Sleep[]>>;
}

const SleepCard = ({ sleep, sleeps, setSleeps }: SleepCardProps) => {
  const router = useRouter();
  return (
    <Card
      title={`${sleep.start} - ${sleep.end}`}
      button={{
        label: 'Edit',
        handleClick: () => router.push(`${routes.editSleep}/${sleep.id}`),
      }}
    >
      <div>
        <p>Duration: xxx</p>
        <p>Nightmare: {sleep.nightmare ? 'yes' : 'no'}</p>
        <p>Wake-up: {sleep.wakeUp ? 'yes' : 'no'}</p>
        <p>Sweat: {sleep.sweat ? 'yes' : 'no'}</p>
        <p>Note: {sleep.note}</p>
      </div>
    </Card>
  );
};

export default SleepCard;
