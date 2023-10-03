'use client';

import { useState } from 'react';
import useContactForm from '../hooks/useContactForm';
import sendEmail from '../lib/sendEmail';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const { values, handleChange, resetForm } = useContactForm();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const req = await sendEmail(values.email, values.subject, values.message);
      if (req.status === 200) {
        toast.success(req.data.message);
        resetForm();
      }
    } catch (e) {
      console.log(e);
      toast.error('Error, try again');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <label htmlFor='email'>Email</label>
      <input
        required
        id='email'
        value={values.email}
        onChange={handleChange}
        type='email'
        className='border mb-2'
      />

      <label htmlFor='subject'>Subject</label>
      <input
        required
        id='subject'
        value={values.subject}
        onChange={handleChange}
        type='text'
        className='border mb-2'
      />
      <label htmlFor='message'>Message</label>
      <textarea
        required
        id='message'
        value={values.message}
        onChange={handleChange}
        rows={6}
        className='border mb-2'
      />
      <button
        type='submit'
        value='Submit'
        className='border mb-2 disabled:cursor-not-allowed'
        disabled={isPending}
      >
        {isPending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default ContactForm;
