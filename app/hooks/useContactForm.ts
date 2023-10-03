import { useState } from 'react';

const initialFormValues = {
  email: '',
  subject: '',
  message: '',
};

const useContactForm = () => {
  const [values, setValues] = useState(initialFormValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;

    setValues((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };

  const resetForm = () => {
    setValues(initialFormValues);
  };

  return { values, handleChange, resetForm };
};

export default useContactForm;
