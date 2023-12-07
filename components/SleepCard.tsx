import { Sleep } from '@prisma/client';
import { Card } from './basic';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants';
import { Dispatch, SetStateAction } from 'react';
import TK from '@/utils/timekeeper';

interface SleepCardProps {
  sleep: Sleep;
  sleeps: Sleep[];
  setSleeps: Dispatch<SetStateAction<Sleep[]>>;
}

const SleepCard = ({ sleep, sleeps, setSleeps }: SleepCardProps) => {
  const router = useRouter();
  return (
    <Card
      title={`${TK.parseDate(sleep.start).month} ${
        TK.parseDate(sleep.start).day
      }, ${TK.parseDate(sleep.start).year} - ${TK.parseDate(sleep.end).month} ${
        TK.parseDate(sleep.end).day
      }, ${TK.parseDate(sleep.end).year}`}
      button={{
        label: 'Edit',
        handleClick: () => router.push(`${routes.editSleep}/${sleep.id}`),
      }}
    >
      <div>
        <p>
          Duration:{' '}
          {`${TK.parseLength(sleep.duration).hour} hours ${
            TK.parseLength(sleep.duration).minute
          } minutes`}
        </p>
        <p>Nightmare: {sleep.nightmare ? 'yes' : 'no'}</p>
        <p>Wake-up: {sleep.wakeUp ? 'yes' : 'no'}</p>
        <p>Sweat: {sleep.sweat ? 'yes' : 'no'}</p>
        <p>Note: {sleep.note}</p>
      </div>
    </Card>
  );
};

export default SleepCard;
