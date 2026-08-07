import { z } from 'zod';

// Shared between the client-side form (src/components/contact/ContactForm.tsx) and
// the server endpoint (src/pages/api/contact.ts) so validation can't drift apart.
export const contactSchema = z.object({
	name: z.string().trim().min(2, 'Enter your full name.'),
	email: z.email('Enter a valid email address.').trim(),
	phone: z.string().trim().optional().or(z.literal('')),
	message: z.string().trim().min(10, 'Tell us a bit more (at least 10 characters).'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
