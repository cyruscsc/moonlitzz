'use client';

import { ChangeEventHandler } from 'react';

interface CheckboxProps {
  name?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({
  name,
  checked,
  required,
  disabled,
  label,
  handleChange,
}: CheckboxProps) => {
  return (
    <div className='form-control w-full max-w-xs'>
      <label className='label cursor-pointer'>
        <span className='label-text'>{label}</span>
        <input
          type='checkbox'
          name={name}
          checked={checked || false}
          required={required || false}
          disabled={disabled || false}
          onChange={handleChange}
          className='checkbox'
        />
      </label>
    </div>
  );
};

export default Checkbox;
