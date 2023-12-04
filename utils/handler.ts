import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface FormChangable {
  e: ChangeEvent<HTMLInputElement>;
  formData: {};
  setFormData: Dispatch<SetStateAction<any>>;
}

export const formChangeHandler = ({
  e,
  formData,
  setFormData,
}: FormChangable) => {
  switch (e.currentTarget.type) {
    case 'checkbox':
      const { name: checkboxName, checked } = e.currentTarget;
      setFormData({ ...formData, [checkboxName]: checked });
      break;
    case 'datetime-local':
      const { name: datetimeName, value: datetimeValue } = e.currentTarget;
      setFormData({ ...formData, [datetimeName]: datetimeValue });
      break;
    default:
      const { name, value } = e.currentTarget;
      setFormData({ ...formData, [name]: value });
      break;
  }
};
