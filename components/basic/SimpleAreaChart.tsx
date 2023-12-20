'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface AreaChartProps {
  data: {
    name: string;
  }[];
  dataKey: string;
}

const SimpleAreaChart = ({ data, dataKey }: AreaChartProps) => {
  return (
    <ResponsiveContainer aspect={2} maxHeight={240}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: -40,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id={`${dataKey}Color`} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#2ea4d8' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#2ea4d8' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' hide={true} />
        <YAxis tickLine={false} />
        <Tooltip />
        <Area
          type='monotone'
          dataKey={dataKey}
          stroke='#2ea4d8'
          fillOpacity={1}
          fill={`url(#${dataKey}Color)`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SimpleAreaChart;
