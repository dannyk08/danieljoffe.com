import { NextResponse } from 'next/server';
import { ErrorResponse, formSchema, WebFormsResponse } from './schema';
import { sendEmail, validateEmail, validateFormData } from './helpers';

export async function POST(
  request: Request
): Promise<NextResponse<ErrorResponse | unknown>> {
  const data = await request.json();

  try {
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
