'use client';

import TextArea from '@/components/units/TextArea';
import TextInput from '@/components/units/TextInput';
import { Button } from '@/components/units/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorResponse, formSchema } from '@/app/api/email/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import InputFeedback from '@/components/units/InputFeedback';

export const contactFormId = 'contact-form';

export default function Form() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
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
        return setError(error.path, { message: error.message });
      }

      setSubmitSuccess(true);
    } catch (e: unknown) {
      console.error(e);
      setError('root.unknownError', {
          message: 'An unknown error occurred. Please try again later.',
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
        required={true}
        {...register('name')}
        error={errors?.name?.message}
      />
      <TextInput
        label="Email"
        placeholder="john.doe@example.com"
        type="email"
        autoComplete="email"
        required={true}
        {...register('email')}
        error={errors?.email?.message}
      />
      <TextArea
        label="Message"
        placeholder={`Hello, I'm interested in your services.\n\nBest regards,\nJohn Doe`}
        type="textarea"
        autoComplete="off"
        required={true}
        {...register('message')}
        error={errors?.message?.message}
      />
      <Button variant="secondary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
      {(errors.root?.serverError ||
        errors.root?.configurationError ||
        errors.root?.unknownError) && (
        <InputFeedback
          inputId={contactFormId}
          message={
            (
              errors.root?.serverError ||
              errors.root?.configurationError ||
              errors.root?.unknownError
            )?.message ?? ''
          }
          type="error"
        />
      )}
    </form>
  );
}
