'use client';

import { ChangeEventHandler } from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'datetime-local';
  name?: string;
  value?: string | number | null;
  min?: string | number;
  max?: string | number;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  help?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  type,
  name,
  value,
  min,
  max,
  minLength,
  maxLength,
  placeholder,
  required,
  disabled,
  label,
  help,
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
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required || false}
        disabled={disabled || false}
        onChange={handleChange}
        className='input input-bordered input-sm w-full'
      />
      <div className='label'>
        <span className='label-text-alt text-secondary'>{help}</span>
      </div>
    </label>
  );
};

export default Input;
