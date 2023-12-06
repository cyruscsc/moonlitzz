'use client';

import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  children?: ReactNode;
  style?: 'default' | 'warning';
  disabled?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  type,
  children,
  style,
  disabled,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      type={type || 'button'}
      disabled={disabled || false}
      onClick={handleClick}
      className={`btn ${style === 'warning' ? 'btn-accent' : 'btn-secondary'} ${
        disabled ? 'btn-disabled' : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
