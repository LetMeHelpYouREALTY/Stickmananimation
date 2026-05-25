import { NextResponse } from 'next/server';
import { insertSubscriberSchema } from '@shared/schema';
import { fromZodError } from 'zod-validation-error';
import { z } from 'zod';
import { prepareStorage } from '@/lib/server/runtime';
import { storage } from '@/lib/server/storage';

const requestSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    consent: z.boolean().optional(),
    consentGiven: z.boolean().optional(),
  })
  .transform(({ name, email, consent, consentGiven }) => ({
    name,
    email,
    consentGiven: consentGiven ?? consent ?? true,
  }));

export async function POST(request: Request) {
  try {
    await prepareStorage();
    const body = await request.json();
    const transformed = requestSchema.safeParse(body);

    if (!transformed.success) {
      const validationError = fromZodError(transformed.error);
      return NextResponse.json({ message: validationError.message }, { status: 400 });
    }

    const validatedData = insertSubscriberSchema.safeParse(transformed.data);
    if (!validatedData.success) {
      const validationError = fromZodError(validatedData.error);
      return NextResponse.json({ message: validationError.message }, { status: 400 });
    }

    const existingSubscriber = await storage.getSubscriberByEmail(validatedData.data.email);
    if (existingSubscriber) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 });
    }

    const newSubscriber = await storage.createSubscriber(validatedData.data);
    return NextResponse.json(newSubscriber, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Failed to subscribe to newsletter' }, { status: 500 });
  }
}
