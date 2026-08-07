import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';
import { contactSchema } from '../../lib/contactSchema';

// Site is static output (see astro.config.mjs) — this opts just this route out of
// prerendering so it deploys as a Vercel serverless function instead.
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const json = () => new Headers({ 'Content-Type': 'application/json' });

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ success: false, message: 'Invalid request body.' }), {
			status: 400,
			headers: json(),
		});
	}

	const parsed = contactSchema.safeParse(body);
	if (!parsed.success) {
		return new Response(
			JSON.stringify({ success: false, message: 'Please check the form and try again.', errors: z.flattenError(parsed.error).fieldErrors }),
			{ status: 422, headers: json() },
		);
	}

	const { name, email, phone, message } = parsed.data;

	const apiKey = import.meta.env.SENDGRID_API_KEY;
	const toEmail = import.meta.env.CONTACT_TO_EMAIL;
	const fromEmail = import.meta.env.CONTACT_FROM_EMAIL;

	if (!apiKey || !toEmail || !fromEmail) {
		// SendGrid is the confirmed provider (see CLAUDE.md) but no real credentials
		// exist yet — fail loudly and honestly instead of silently pretending to send.
		console.error('Contact form submission received but SendGrid is not configured:', { name, email, phone, message });
		return new Response(
			JSON.stringify({
				success: false,
				message: "Sorry, the contact form isn't fully set up yet. Please reach out by phone or email directly.",
			}),
			{ status: 503, headers: json() },
		);
	}

	sgMail.setApiKey(apiKey);

	try {
		await sgMail.send({
			to: toEmail,
			from: fromEmail,
			replyTo: email,
			subject: `New contact form submission from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
		});
	} catch (error) {
		console.error('SendGrid send failed:', error);
		return new Response(JSON.stringify({ success: false, message: 'Something went wrong sending your message. Please try again.' }), {
			status: 502,
			headers: json(),
		});
	}

	return new Response(JSON.stringify({ success: true, message: "Thanks — we'll be in touch soon." }), {
		status: 200,
		headers: json(),
	});
};
