import {
  ErrorResponse,
  FormFieldSchema,
  ValidKitErrorResponse,
  WebFormsResponse,
} from './schema';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { env, RequiredEnvVars } from '@/lib/env';

export const validateFormData = async <T extends yup.AnyObject>(
  data: FormFieldSchema,
  schema: yup.ObjectSchema<T>
): Promise<ErrorResponse | null> => {
  try {
    await schema.validate(data, {
      stripUnknown: true,
    });
    return null;
  } catch (e: unknown) {
    const error = e as ValidationError;
    throw {
      error: {
        [error.path ?? 'unknown']: { message: error.message },
      },
      statusCode: 200,
    } as ErrorResponse;
  }
};

export const validateEmail = async (
  email: string
): Promise<ErrorResponse | null> => {
  if (!env.VALIDKIT_API_KEY) {
    throw {
      error: {
        unknown: {
          message: `${RequiredEnvVars.VALIDKIT_API_KEY} is not set`,
        },
      },
      statusCode: 200,
    } as ErrorResponse;
  }

  try {
    const res = await fetch(env.VALIDKIT_API_URL ?? '', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': env.VALIDKIT_API_KEY ?? '',
      },
    });
    const response = await res.json();
    const { error } = response as ValidKitErrorResponse;

    if (error) {
      throw response;
    }
    return null;
  } catch (e: unknown) {
    const error = e as ValidKitErrorResponse;
    throw {
      error: {
        email: { message: error.error.message },
      },
      statusCode: error.error.statusCode,
    } as ErrorResponse;
  }
};

export const sendEmail = async (
  data: FormFieldSchema
): Promise<ErrorResponse | null> => {
  if (!env.WEB3FORMS_ACCESS_KEY) {
    throw {
      error: {
        unknown: {
          message: `${RequiredEnvVars.WEB3FORMS_ACCESS_KEY} is not set`,
        },
      },
      statusCode: 200,
    } as ErrorResponse;
  }

  try {
    await fetch(env.WEB3FORMS_API_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        subject: `📥 Web3Forms: New message from ${data.name}`,
        access_key: env.WEB3FORMS_ACCESS_KEY,
      }),
    });

    return null;
  } catch (e: unknown) {
    const error = e as WebFormsResponse;
    throw {
      error: {
        service: { message: error.body.message },
      },
      statusCode: error.statusCode,
    } as ErrorResponse;
  }
};
