'use client';

import { MouseEventHandler, ReactNode } from 'react';

interface AccordionProps {
  title?: string;
  children?: ReactNode;
  handleClick?: MouseEventHandler<HTMLInputElement>;
}

const Accordion = ({ title, children, handleClick }: AccordionProps) => {
  return (
    <div className='collapse collapse-arrow bg-neutral'>
      <input type='radio' name='my-accordion-2' onClick={handleClick} />
      <div className='collapse-title text-lg font-medium'>{title}</div>
      <div className='collapse-content'>{children}</div>
    </div>
  );
};

export default Accordion;
