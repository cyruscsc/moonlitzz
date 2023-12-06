import { MouseEventHandler, ReactNode } from 'react';
import { Button } from '.';

interface CardProps {
  title?: string;
  children?: ReactNode;
  button?: {
    label?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
  };
}

const Card = ({ title, children, button }: CardProps) => {
  return (
    <div className='card w-96 bg-neutral text-neutral-content'>
      <div className='card-body'>
        {title && <h2 className='card-title'>{title}</h2>}
        {children}
        {button && (
          <div className='card-actions justify-end'>
            <Button style='default' handleClick={button.handleClick}>
              {button.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
