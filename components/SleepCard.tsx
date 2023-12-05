import { Sleep } from '@prisma/client';
import { Button, Card } from './basic';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants';
import { SleepDeleteButton } from '.';
import { Dispatch } from 'react';

interface SleepCardProps {
  sleep: Sleep;
  sleeps: Sleep[];
  setSleeps: Dispatch<React.SetStateAction<Sleep[]>>;
}

const SleepCard = ({ sleep, sleeps, setSleeps }: SleepCardProps) => {
  const router = useRouter();
  return (
    <Card>
      <h2>
        {sleep.start} to {sleep.end}
      </h2>
      <p>Duration: xxx</p>
      <p>Nightmare: {sleep.nightmare ? 'yes' : 'no'}</p>
      <p>Wake-up: {sleep.wakeUp ? 'yes' : 'no'}</p>
      <p>Sweat: {sleep.sweat ? 'yes' : 'no'}</p>
      <p>Note: {sleep.note && sleep.note}</p>
      <Button
        handleClick={() => router.push(`${routes.editSleep}/${sleep.id}`)}
      >
        Edit
      </Button>
      <SleepDeleteButton id={sleep.id} sleeps={sleeps} setSleeps={setSleeps} />
    </Card>
  );
};

export default SleepCard;
