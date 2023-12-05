import { Sleep } from '@prisma/client';
import { Card } from './basic';

interface SleepCardProps {
  sleep: Sleep;
}

const SleepCard = ({ sleep }: SleepCardProps) => {
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
    </Card>
  );
};

export default SleepCard;
