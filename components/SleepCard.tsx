import { Sleep } from '@prisma/client';
import { Button, Card } from './basic';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants';

interface SleepCardProps {
  sleep: Sleep;
}

const SleepCard = ({ sleep }: SleepCardProps) => {
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
    </Card>
  );
};

export default SleepCard;
