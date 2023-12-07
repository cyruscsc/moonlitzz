'use client';

import { ChangeEventHandler } from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'datetime-local';
  name?: string;
  value?: string | number | null;
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
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <input
        type={type || 'text'}
        name={name}
        value={value || ''}
        min={min}
        max={max}
        placeholder={placeholder}
        required={required || false}
        disabled={disabled || false}
        onChange={handleChange}
        className='input input-bordered input-sm w-full'
      />
    </label>
  );
};

export default Input;
