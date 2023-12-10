import SleepAnalyst from '@/utils/sleep-analyst';
import { SimpleAreaChart } from './basic';

interface SleepTabContentProps {
  sleepAnalyst: SleepAnalyst;
}

const SleepTabContent = ({ sleepAnalyst }: SleepTabContentProps) => {
  return (
    <div className='flex flex-col gap-3'>
      <SimpleAreaChart data={sleepAnalyst.data} dataKey='duration' />
      <div className='flex justify-end gap-3 text-sm text-primary'>
        <span>Average:</span>
        <span>{`${sleepAnalyst.average.hour}:${sleepAnalyst.average.minute}`}</span>
      </div>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>Event</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Nightmare</td>
              <td>{sleepAnalyst.nightmares}</td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Wakeup</td>
              <td>{sleepAnalyst.wakeups}</td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Sweat</td>
              <td>{sleepAnalyst.sweats}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SleepTabContent;
