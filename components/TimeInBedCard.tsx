import { Sleep } from '@prisma/client';
import { Card, Tabs } from './basic';
import SA from '@/utils/sleep-analyst';
import { SleepTabContent } from '.';

interface TimeInBedCardProps {
  sleeps: Sleep[];
}

const TimeInBedCard = ({ sleeps }: TimeInBedCardProps) => {
  const sa07 = new SA(sleeps, 7);
  const sa30 = new SA(sleeps, 30);
  const tabs = [
    {
      label: '7 days',
      content: <SleepTabContent sleepAnalyst={sa07} />,
    },
    {
      label: '30 days',
      content: <SleepTabContent sleepAnalyst={sa30} />,
    },
  ];
  return (
    <Card title='Time in Bed'>
      <Tabs tabs={tabs} />
    </Card>
  );
};

export default TimeInBedCard;
