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
import DOMPurify from 'isomorphic-dompurify';

// Simple in-memory store for rate limiting (per process)
const RATE_LIMIT_WINDOW_MS = 1000 * 60 * 30; // 30 minutes
const RATE_LIMIT_MAX = 20;

export const validateFormData = async <T extends yup.AnyObject>(
  data: FormFieldSchema,
  schema: yup.ObjectSchema<T>
): Promise<ErrorResponse | null> => {
  try {
    // @ts-expect-error - address is a hidden field
    if (data?.address?.length > 0) {
      throw {
        error: {
          path: 'root.forbidden',
          message: 'Forbidden',
        },
        statusCode: 403,
      } as ErrorResponse;
    }

    // Sanitize inputs
    const sanitized: FormFieldSchema = {
      name: DOMPurify.sanitize(data.name),
      email: DOMPurify.sanitize(data.email),
      message: DOMPurify.sanitize(data.message),
      hcaptcha: data.hcaptcha,
      // @ts-expect-error - address is a hidden field
      address: data.address,
    } as unknown as FormFieldSchema;

    await schema.validate(sanitized, {
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

export const rateLimit = async (
  req: NextRequest
): Promise<ErrorResponse | null> => {
  const errorResponse: ErrorResponse = {
    error: {
      path: 'root.forbidden',
      message: 'Forbidden',
    },
    statusCode: 403,
  };

  try {
    const ip = req.headers.get('x-forwarded-for');
    if (!ip) {
      throw errorResponse;
    }

    const entry = incrementRateLimit(ip);

    if (entry.count > RATE_LIMIT_MAX) {
      throw errorResponse;
    }

    return Promise.resolve(null);
  } catch (e: unknown) {
    const error = e as ErrorResponse;
    throw error;
  }
};

const incrementRateLimit = (ip: string) => {
  const now = Date.now();

  // @ts-expect-error - global is not defined in the browser
  if (!global.__apiRateLimitStore) {
    // @ts-expect-error - global is not defined in the browser
    global.__apiRateLimitStore = new Map();
  }

  // @ts-expect-error - server-only code
  const store = global.__apiRateLimitStore as Map<
    string,
    { count: number; reset: number }
  >;

  let entry = store.get(ip);
  if (!entry || entry.reset < now) {
    entry = { count: 1, reset: now + RATE_LIMIT_WINDOW_MS };
    store.set(ip, entry);
  } else {
    entry.count += 1;
    store.set(ip, entry);
  }

  return entry;
};
