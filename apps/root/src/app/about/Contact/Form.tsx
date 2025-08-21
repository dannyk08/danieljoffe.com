'use client';

import TextArea from '@/components/units/TextArea';
import TextInput from '@/components/units/TextInput';
import { Button } from '@/components/units/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ErrorResponse,
  FormFieldError,
  formSchema,
} from '@/app/api/email/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export const contactFormId = 'contact-form';

export default function Form() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionError, setSubmissionError] =
    useState<Partial<FormFieldError> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<InferType<typeof formSchema>> = async (
    formData
  ) => {
    setIsSubmitting(true);
    const payload = Object.entries(formData).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value.trim(),
      }),
      {} as Record<string, string>
    );

    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const { error } = (await res.json()) as ErrorResponse;

      if (error) {
        console.error(error);
        return setSubmissionError(error);
      }

      setSubmitSuccess(true);
    } catch (e: unknown) {
      console.error(e);
      setSubmissionError({
        unknown: {
          message: 'An unknown error occurred. Please try again later.',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitSuccess) {
      redirect('/thank-you/email');
    }
  }, [submitSuccess]);

  return (
    <form
      id={contactFormId}
      className="flex flex-col gap-4 text-white"
      onSubmit={handleSubmit(onSubmit)}
      action=""
    >
      <TextInput
        placeholder="John Doe"
        type="text"
        autoComplete="name"
        label="Name"
        {...register('name')}
        error={(errors?.name ?? submissionError?.name)?.message}
      />
      <TextInput
        label="Email"
        placeholder="john.doe@example.com"
        type="email"
        autoComplete="email"
        {...register('email')}
        error={(errors?.email ?? submissionError?.email)?.message}
      />
      <TextArea
        label="Message"
        placeholder={`Hello, I'm interested in your services.\n\nBest regards,\nJohn Doe`}
        type="textarea"
        autoComplete="off"
        {...register('message')}
        error={(errors?.message ?? submissionError?.message)?.message}
      />
      <Button variant="secondary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
