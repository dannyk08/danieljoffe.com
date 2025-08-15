'use client';

import { useState } from 'react';
import TextArea from '@/components/units/TextArea';
import TextInput from '@/components/units/TextInput';
import { Button } from '@/components/units/Button';

export const contactFormId = 'contact-form';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  return (
    <form
      id={contactFormId}
      className="flex flex-col gap-4 text-white"
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submitted', formData);
      }}
    >
      <TextInput
        label="Name"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextInput
        label="Email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextArea
        label="Message"
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <Button variant="secondary" type="submit">
        Submit
      </Button>
    </form>
  );
}
