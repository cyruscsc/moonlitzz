import { ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
  bgColor?: string;
  textColor?: string;
}

const Card = ({ children, bgColor, textColor }: CardProps) => {
  return (
    <article
      className={`${bgColor ? bgColor : ''} ${textColor ? textColor : ''}`}
    >
      {children}
    </article>
  );
};

export default Card;
