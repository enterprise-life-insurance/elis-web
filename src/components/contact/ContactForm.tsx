import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormValues } from '../../lib/contactSchema';

type SubmitState = { status: 'idle' | 'success' | 'error'; message?: string };

export default function ContactForm() {
	const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

	const onSubmit = async (values: ContactFormValues) => {
		setSubmitState({ status: 'idle' });
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			});
			const data = await res.json();

			if (!res.ok) {
				setSubmitState({ status: 'error', message: data.message ?? 'Something went wrong. Please try again.' });
				return;
			}

			setSubmitState({ status: 'success', message: data.message });
			reset();
		} catch {
			setSubmitState({ status: 'error', message: 'Something went wrong. Please try again.' });
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
			<div>
				<label htmlFor="name" className="mb-1 block text-sm font-medium text-natural-grey-900">
					Full name
				</label>
				<input
					id="name"
					type="text"
					{...register('name')}
					className="w-full rounded-lg border border-natural-grey-700 px-4 py-3 text-natural-grey-900 focus:border-enterprise-blue-500 focus:ring-1 focus:ring-enterprise-blue-500 focus:outline-none"
				/>
				{errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
			</div>

			<div>
				<label htmlFor="email" className="mb-1 block text-sm font-medium text-natural-grey-900">
					Email
				</label>
				<input
					id="email"
					type="email"
					{...register('email')}
					className="w-full rounded-lg border border-natural-grey-700 px-4 py-3 text-natural-grey-900 focus:border-enterprise-blue-500 focus:ring-1 focus:ring-enterprise-blue-500 focus:outline-none"
				/>
				{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
			</div>

			<div>
				<label htmlFor="phone" className="mb-1 block text-sm font-medium text-natural-grey-900">
					Phone <span className="text-natural-grey-800">(optional)</span>
				</label>
				<input
					id="phone"
					type="tel"
					{...register('phone')}
					className="w-full rounded-lg border border-natural-grey-700 px-4 py-3 text-natural-grey-900 focus:border-enterprise-blue-500 focus:ring-1 focus:ring-enterprise-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label htmlFor="message" className="mb-1 block text-sm font-medium text-natural-grey-900">
					Message
				</label>
				<textarea
					id="message"
					rows={5}
					{...register('message')}
					className="w-full rounded-lg border border-natural-grey-700 px-4 py-3 text-natural-grey-900 focus:border-enterprise-blue-500 focus:ring-1 focus:ring-enterprise-blue-500 focus:outline-none"
				/>
				{errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="inline-flex items-center justify-center gap-2 rounded-full bg-life-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-life-green-600 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{isSubmitting ? 'Sending…' : 'Send Message'}
			</button>

			{submitState.status === 'success' && (
				<p role="status" className="rounded-lg bg-life-green-50 px-4 py-3 text-sm text-life-green-700">
					{submitState.message}
				</p>
			)}
			{submitState.status === 'error' && (
				<p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
					{submitState.message}
				</p>
			)}
		</form>
	);
}
