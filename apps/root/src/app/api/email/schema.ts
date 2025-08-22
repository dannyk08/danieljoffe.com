import * as yup from 'yup';

type FormField = 'name' | 'email' | 'message';
type RootError =
  | 'root.configurationError'
  | 'root.serviceError'
  | 'root.serverError'
  | 'root.unknownError';
type ErrorSource = FormField | RootError;

export type FormFieldError = Record<ErrorSource, { message: string }>;
export type FormFieldSchema<T = string> = Record<FormField, T>;

export type ErrorResponse = {
  error: {
    path: ErrorSource;
    message: string;
  };
  statusCode: 200 | 400 | 500;
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
export const NAME_MAX_LENGTH = 100;
export const EMAIL_MIN_LENGTH = 3;
export const EMAIL_MAX_LENGTH = 255;
export const MESSAGE_MIN_LENGTH = 30;
export const MESSAGE_MAX_LENGTH = 500;

export const minLengthMessage = (label: string, min: number) =>
  `${label} must be at least ${min} characters`;
export const maxLengthMessage = (label: string, max: number) =>
  `${label} must be at most ${max} characters`;

export const formSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .min(NAME_MIN_LENGTH, minLengthMessage('Name', NAME_MIN_LENGTH))
      .max(NAME_MAX_LENGTH, maxLengthMessage('Name', NAME_MAX_LENGTH))
      .required('Name is required'),
    email: yup
      .string()
      .email('Invalid email address')
      .min(EMAIL_MIN_LENGTH, minLengthMessage('Email', EMAIL_MIN_LENGTH))
      .max(EMAIL_MAX_LENGTH, maxLengthMessage('Email', EMAIL_MAX_LENGTH))
      .required('Email is required'),
    message: yup
      .string()
      .min(MESSAGE_MIN_LENGTH, minLengthMessage('Message', MESSAGE_MIN_LENGTH))
      .max(MESSAGE_MAX_LENGTH, maxLengthMessage('Message', MESSAGE_MAX_LENGTH))
      .required('Message is required'),
  })
  .label('Contact Form')
  .required();
