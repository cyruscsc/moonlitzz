'use client';

import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  children?: ReactNode;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  type,
  children,
  bgColor,
  textColor,
  disabled,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      type={type || 'button'}
      disabled={disabled || false}
      onClick={handleClick}
      className={`${bgColor ? bgColor : ''} ${textColor ? textColor : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
