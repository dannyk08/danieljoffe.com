'use client';

import TextArea from '@/components/units/TextArea';
import TextInput from '@/components/units/TextInput';
import { Button } from '@/components/units/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorResponse, formSchema } from '@/app/api/email/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useEffect, useRef, useState } from 'react';
import InputFeedback from '@/components/units/InputFeedback';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { publicEnv } from '@/lib/public.env';
import { useTransitionRouter } from 'next-transition-router';

export const contactFormId = 'contact-form';

export default function Form() {
  const router = useTransitionRouter();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hcaptchaRef = useRef<HCaptcha>(null);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
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

  const onVerify = (token: string) => {
    setValue('hcaptcha', token);
  };

  useEffect(() => {
    if (submitSuccess) {
      router.push('/thank-you/email');
    }
  }, [submitSuccess, router]);

  return (
    <form
      id={contactFormId}
      className="flex flex-col gap-4 text-white relative"
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
      <div className="absolute top-0 left-0 w-0 h-0 pointer-events-none -z-1 hidden">
        <TextInput
          name="address"
          label="Address"
          placeholder="1234 Main St, Anytown, USA"
          type="hidden"
          autoComplete="off"
          className="hidden"
          aria-hidden={true}
        />
      </div>
      <div className="flex justify-center">
        <HCaptcha
          ref={hcaptchaRef}
          sitekey={publicEnv.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? ''}
          onVerify={onVerify}
        />
      </div>
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
