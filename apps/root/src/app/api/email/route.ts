import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse, formSchema, WebFormsResponse } from './schema';
import {
  requestFromSource,
  sendEmail,
  validateEmail,
  validateFormData,
  rateLimit,
} from './helpers';
import { ABOUT_LINK } from '@/components/assembled/Nav/Links';

export async function POST(
  request: NextRequest
): Promise<NextResponse<ErrorResponse | WebFormsResponse>> {
  const data = await request.json();

  try {
    await rateLimit(request);
    await requestFromSource(request, ABOUT_LINK.href);
    await validateFormData(data, formSchema);
    await validateEmail(data.email);
    await sendEmail(data);

    const successResponse = {
      statusCode: 200,
      success: true,
      body: {
        data: {},
        message: 'Email sent successfully',
      },
    } as WebFormsResponse;

    return NextResponse.json(successResponse, {
      status: successResponse.statusCode,
    });
  } catch (e: unknown) {
    const error = e as ErrorResponse;
    return NextResponse.json(error, { status: error.statusCode });
  }
}
