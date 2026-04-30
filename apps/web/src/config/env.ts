import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  API_INTERNAL_URL: z.string().url(),
  NEXT_PUBLIC_BREVO_NEWSLETTER_URL: z.string().url().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env['NEXT_PUBLIC_SITE_URL'],
  API_INTERNAL_URL: process.env['API_INTERNAL_URL'],
  NEXT_PUBLIC_BREVO_NEWSLETTER_URL: process.env['NEXT_PUBLIC_BREVO_NEWSLETTER_URL'],
});
