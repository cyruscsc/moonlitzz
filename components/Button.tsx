'use client';

import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  children?: ReactNode;
  bgColor?: string;
  textColor?: string;
  loading?: boolean;
  handleClick?: MouseEventHandler;
}

const Button = ({
  type,
  children,
  bgColor,
  textColor,
  loading,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      type={type || 'button'}
      disabled={loading || false}
      onClick={handleClick}
      className={`${bgColor ? bgColor : ''} ${textColor ? textColor : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
