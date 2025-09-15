import * as yup from 'yup';
import { FORM_LIMITS, VALIDATION_PATTERNS } from '@/utils/constants';

type FormField = 'name' | 'email' | 'message' | 'hcaptcha';
type RootError =
  | 'root.configurationError'
  | 'root.serviceError'
  | 'root.serverError'
  | 'root.unknownError'
  | 'root.forbidden';
type ErrorSource = FormField | RootError;

export type FormFieldError = Record<ErrorSource, { message: string }>;
export type FormFieldSchema<T = string> = Record<FormField, T>;

export type ErrorResponse = {
  error: {
    path: ErrorSource;
    message: string;
  };
  statusCode: 200 | 400 | 500 | 403;
};

export type ValidKitErrorResponse = {
  error: {
    message: string;
    code: string;
    statusCode: 400;
  };
};

export type WebFormsResponse<T = FormFieldSchema> = {
  statusCode: 200 | 400 | 500;
  success: boolean;
  body: {
    data: T;
    message: string;
  };
};

export const NAME_MIN_LENGTH = 5;
export const NAME_MAX_LENGTH = FORM_LIMITS.NAME_MAX_LENGTH;
export const EMAIL_MIN_LENGTH = 3;
export const EMAIL_MAX_LENGTH = FORM_LIMITS.EMAIL_MAX_LENGTH;
export const MESSAGE_MIN_LENGTH = 30;
export const MESSAGE_MAX_LENGTH = FORM_LIMITS.MESSAGE_MAX_LENGTH;

export const minLengthMessage = (label: string, min: number) =>
  `${label} must be at least ${min} characters`;
export const maxLengthMessage = (label: string, max: number) =>
  `${label} must be at most ${max} characters`;

export const formSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .transform(value => (value ? value.trim() : value))
      .matches(VALIDATION_PATTERNS.NAME, 'Name contains invalid characters')
      .min(NAME_MIN_LENGTH, minLengthMessage('Name', NAME_MIN_LENGTH))
      .max(NAME_MAX_LENGTH, maxLengthMessage('Name', NAME_MAX_LENGTH))
      .required('Name is required'),
    email: yup
      .string()
      .transform(value => (value ? value.trim() : value))
      .email('Invalid email address')
      .min(EMAIL_MIN_LENGTH, minLengthMessage('Email', EMAIL_MIN_LENGTH))
      .max(EMAIL_MAX_LENGTH, maxLengthMessage('Email', EMAIL_MAX_LENGTH))
      .required('Email is required'),
    message: yup
      .string()
      .transform(value => (value ? value.trim() : value))
      .test('no-urls', 'Please remove links from your message', val =>
        val ? !/https?:\/\//i.test(val) : true
      )
      .min(MESSAGE_MIN_LENGTH, minLengthMessage('Message', MESSAGE_MIN_LENGTH))
      .max(MESSAGE_MAX_LENGTH, maxLengthMessage('Message', MESSAGE_MAX_LENGTH))
      .required('Message is required'),
    hcaptcha: yup.string().required('Please verify you are human'),
  })
  .label('Contact Form')
  .required();
