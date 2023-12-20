'use client';

import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  children?: ReactNode;
  style?: 'default' | 'warning';
  disabled?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button = ({
  type,
  children,
  style,
  disabled,
  handleClick,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type || 'button'}
      disabled={disabled || false}
      onClick={handleClick}
      className={`btn ${style === 'warning' ? 'btn-error' : 'btn-secondary'} ${
        disabled ? 'btn-disabled' : ''
      } ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
