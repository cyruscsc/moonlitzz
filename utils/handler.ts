import { BasicResponseData } from '@/types/api.types';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import toast from 'react-hot-toast';

interface FormChangable {
  e: ChangeEvent<HTMLInputElement>;
  formData: {};
  setFormData: Dispatch<SetStateAction<any>>;
}

/**
 * A generic form change handler for input elements that update the form data React state
 * @param {ChangeEvent<HTMLInputElement>} e - Change event from input
 * @param {Object} formData - Form data object
 * @param {Dispatch<SetStateAction<any>>} setFormData - Form data React state setter
 */
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

interface FormSubmitable {
  e: FormEvent<HTMLFormElement>;
  endpoint: string;
  method?: string;
  headers?: {};
  formData: {};
  setLoading?: Dispatch<SetStateAction<boolean>>;
  handleStatus?: {
    [statusCode: number]: () => any;
  };
}

/**
 * A generic form submit handler for form elements that send a request to an API endpoint
 * @param {FormEvent<HTMLFormElement>} e - Submit event from form
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (optional, default: POST)
 * @param {Object} headers - HTTP headers (optional, default: { 'Content-Type': 'application/json' })
 * @param {Object} formData - Form data object
 * @param {Dispatch<SetStateAction<boolean>>} setLoading - Loading state setter (optional)
 * @param {Object} handleStatus - Object containing functions to handle different HTTP status codes (optional)
 */
export const formSubmitHandler = async ({
  e,
  endpoint,
  method,
  headers,
  formData,
  setLoading,
  handleStatus,
}: FormSubmitable) => {
  e.preventDefault();
  setLoading && setLoading(true);
  try {
    const res = await fetch(endpoint, {
      method: method || 'POST',
      headers: headers || { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data: BasicResponseData = await res.json();
    switch (res.status) {
      case 200:
        handleStatus && handleStatus[200]();
        data.message && toast.success(data.message);
        break;
      case 201:
        handleStatus && handleStatus[201]();
        data.message && toast.success(data.message);
        break;
      case 400:
        handleStatus && handleStatus[400]();
        data.error && toast.error(data.error);
        break;
      case 401:
        handleStatus && handleStatus[401]();
        data.error && toast.error(data.error);
        break;
      case 403:
        handleStatus && handleStatus[403]();
        data.error && toast.error(data.error);
        break;
      case 404:
        handleStatus && handleStatus[404]();
        data.error && toast.error(data.error);
        break;
      case 500:
        handleStatus && handleStatus[500]();
        data.error && toast.error(data.error);
        break;
      default:
        toast.error('Something went wrong!');
        break;
    }
  } catch (error) {
    toast.error('Something went wrong!');
  }
  setLoading && setLoading(false);
};

/**
 * Opens a dialog element
 * @param {string} forId - HTML id of the dialog element to open
 */
export const modalOpenHandler = (forId: string): void => {
  const dialog = document.getElementById(forId) as HTMLDialogElement;
  dialog.showModal();
};

/**
 * Closes a dialog element
 * @param {string} forId - HTML id of the dialog element to close
 */
export const modalCloseHandler = (forId: string): void => {
  const dialog = document.getElementById(forId) as HTMLDialogElement;
  dialog.close();
};
