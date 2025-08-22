import {
  ErrorResponse,
  FormFieldSchema,
  ValidKitErrorResponse,
  WebFormsResponse,
} from './schema';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { serverEnv, RequiredEnvVars } from '@/lib/env';
import { NextRequest } from 'next/server';

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
        path: error.path ?? 'root.unknownError',
        message: error.message,
      },
      statusCode: 200,
    } as ErrorResponse;
  }
};

export const validateEmail = async (
  email: string
): Promise<ErrorResponse | null> => {
  if (!serverEnv.VALIDKIT_API_KEY) {
    console.error(`${RequiredEnvVars.VALIDKIT_API_KEY} is not configured.`);
    throw {
      error: {
        path: 'root.configurationError',
        message: `Sorry, we're experiencing technical difficulties. Please try again later.`,
      },
      statusCode: 200,
    } as ErrorResponse;
  }

  try {
    const res = await fetch(serverEnv.VALIDKIT_API_URL ?? '', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': serverEnv.VALIDKIT_API_KEY ?? '',
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
        path: 'email',
        message: error.error.message,
      },
      statusCode: error.error.statusCode,
    } as ErrorResponse;
  }
};

export const sendEmail = async (
  data: FormFieldSchema
): Promise<ErrorResponse | null> => {
  if (!serverEnv.WEB3FORMS_ACCESS_KEY) {
    console.error(`${RequiredEnvVars.WEB3FORMS_ACCESS_KEY} is not configured.`);
    throw {
      error: {
        path: 'root.configurationError',
        message: `Sorry, we're experiencing technical difficulties. Please try again later.`,
      },
      statusCode: 200,
    } as ErrorResponse;
  }

  try {
    await fetch(serverEnv.WEB3FORMS_API_URL ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        subject: `📥 Web3Forms: New message from ${data.name}`,
        access_key: serverEnv.WEB3FORMS_ACCESS_KEY,
      }),
    });

    return null;
  } catch (e: unknown) {
    const error = e as WebFormsResponse;
    throw {
      error: {
        path: 'root.serviceError',
        message: error.body.message,
      },
      statusCode: error.statusCode,
    } as ErrorResponse;
  }
};

export const requestFromSource = async (
  req: NextRequest,
  source: string
): Promise<ErrorResponse | null> => {
  const errorResponse: ErrorResponse = {
    error: {
      path: 'root.forbidden',
      message: 'Forbidden',
    },
    statusCode: 403,
  };

  try {
    const referer = req.headers.get('referer');

    if (!referer) {
      throw errorResponse;
    }

    const url = new URL(referer);
    if (!url.pathname.includes(source)) {
      throw errorResponse;
    }

    return Promise.resolve(null);
  } catch (e: unknown) {
    const error = e as ErrorResponse;
    throw error;
  }
};
