'use client';

import { ChangeEventHandler } from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'datetime-local';
  id?: string;
  name?: string;
  value?: string | null;
  min?: string | number;
  max?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  type,
  id,
  name,
  value,
  min,
  max,
  placeholder,
  required,
  disabled,
  label,
  handleChange,
}: InputProps) => {
  return (
    <div>
      {id && label && <label htmlFor={id}>{label}</label>}
      <input
        type={type || 'text'}
        id={id}
        name={name}
        value={value || undefined}
        min={min}
        max={max}
        placeholder={placeholder}
        required={required || false}
        disabled={disabled || false}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
