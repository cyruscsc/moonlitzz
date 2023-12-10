'use client';

import { ReactNode, useState } from 'react';

interface TabContentProps {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabContentProps[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [selected, setSelected] = useState(0);
  return (
    <div role='tablist' className='tabs tabs-lifted'>
      {tabs.map((tab, index) => (
        <>
          <input
            key={index}
            type='radio'
            name='tab'
            role='tab'
            className='tab'
            aria-label={tab.label}
            checked={selected === index}
            onClick={() => setSelected(index)}
          />
          <div
            key={index}
            role='tabpanel'
            className='tab-content bg-base-100 border-base-300 rounded-box p-3'
          >
            {tab.content}
          </div>
        </>
      ))}
    </div>
  );
};

export default Tabs;
