'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTransitionRouter } from 'next-transition-router';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button } from '@/components/units/Button';
import TextInput from '@/components/units/TextInput';
import TextArea from '@/components/units/TextArea';
import { publicEnv } from '@/lib/public.env';
import { formSchema } from '@/app/api/email/schema';
import type { InferType } from 'yup';

export const contactFormId = 'contact-form';

type ContactFormData = InferType<typeof formSchema>;

export default function Form() {
  const router = useTransitionRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<ContactFormData>({
    resolver: yupResolver(formSchema),
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const hcaptchaRef = useRef<HCaptcha>(null);

  const onSubmit = async (data: ContactFormData) => {
    if (isSubmitting) {
      setError('root', {
        type: 'manual',
        message: 'Please wait for the previous submission to complete.',
      });
      return;
    }

    if (!data.hcaptcha) {
      setError('hcaptcha', {
        type: 'manual',
        message: 'Please complete the captcha verification.',
      });
      return;
    }

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        router.push('/thank-you/email');
      }, 2000);
    } catch (error: unknown) {
      console.error(error);
      setError('root.unknownError', {
        type: 'manual',
        message: 'Failed to send message. Please try again.',
      });
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
      className='flex flex-col gap-4 text-white relative'
      onSubmit={handleSubmit(onSubmit)}
      action=''
      aria-labelledby='contact-form-heading'
      noValidate
    >
      <h2 id='contact-form-heading' className='sr-only'>
        Contact Form
      </h2>

      <fieldset className='flex flex-col gap-4'>
        <legend className='sr-only'>Contact Information</legend>

        <TextInput
          placeholder='John Doe'
          type='text'
          autoComplete='name'
          label='Name'
          required={true}
          {...register('name')}
          error={errors?.name?.message}
          aria-describedby={errors?.name?.message ? 'name-error' : undefined}
        />

        <TextInput
          label='Email'
          placeholder='john.doe@example.com'
          type='email'
          autoComplete='email'
          required={true}
          {...register('email')}
          error={errors?.email?.message}
          aria-describedby={errors?.email?.message ? 'email-error' : undefined}
        />

        <TextArea
          label='Message'
          placeholder={`Hello, I'm interested in your services.\n\nBest regards,\nJohn Doe`}
          type='textarea'
          autoComplete='off'
          required={true}
          {...register('message')}
          error={errors?.message?.message}
          aria-describedby={
            errors?.message?.message ? 'message-error' : undefined
          }
        />
      </fieldset>

      {/* Honeypot field for spam protection */}
      <div className='absolute top-0 left-0 w-0 h-0 pointer-events-none -z-1 hidden'>
        <TextInput
          name='address'
          label='Address'
          placeholder='1234 Main St, Anytown, USA'
          type='text'
          autoComplete='off'
          className='hidden'
          aria-hidden={true}
          tabIndex={-1}
        />
      </div>

      <div className='flex justify-center'>
        <HCaptcha
          ref={hcaptchaRef}
          sitekey={publicEnv.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? ''}
          onVerify={onVerify}
          aria-label='Security verification'
        />
      </div>

      <Button
        variant='secondary'
        type='submit'
        disabled={isSubmitting}
        aria-describedby={
          errors.root?.serverError || errors.root?.configurationError
            ? 'form-error'
            : undefined
        }
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>

      {(errors.root?.serverError ||
        errors.root?.configurationError ||
        errors.root?.unknownError ||
        errors.hcaptcha) && (
        <div id='form-error' role='alert' aria-live='assertive'>
          <p className='text-red-500 text-sm'>
            {errors.root?.serverError?.message ||
              errors.root?.configurationError?.message ||
              errors.root?.unknownError?.message ||
              errors.hcaptcha?.message}
          </p>
        </div>
      )}
    </form>
  );
}
