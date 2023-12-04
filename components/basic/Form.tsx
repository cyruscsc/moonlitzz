'use client';

import { FormEvent, ReactNode } from 'react';

interface FormProps {
  id?: string;
  children?: ReactNode;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const Form = ({ id, children, handleSubmit }: FormProps) => {
  return (
    <form id={id} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
