import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className='card w-full bg-neutral text-neutral-content'>
      <div className='card-body'>
        {title && <h2 className='card-title'>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Card;
