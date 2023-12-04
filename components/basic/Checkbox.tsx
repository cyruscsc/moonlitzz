'use client';

import { ChangeEventHandler } from 'react';

interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({
  id,
  name,
  checked,
  required,
  disabled,
  label,
  handleChange,
}: CheckboxProps) => {
  return (
    <div>
      {id && label && <label htmlFor={id}>{label}</label>}
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked || false}
        required={required || false}
        disabled={disabled || false}
        onChange={handleChange}
      />
    </div>
  );
};

export default Checkbox;
