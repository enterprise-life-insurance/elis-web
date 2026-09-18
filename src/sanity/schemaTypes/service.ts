import { defineField, defineType } from 'sanity';

// Six confirmed services per Jay Bablani, client call 2026-08-28 (see
// src/data/services.ts). Schema shape matches Service/ServiceDetail in
// src/data/{services,serviceDetails}.ts exactly, so Studio content is a 1:1
// source for the site (via safeFetch in src/lib/sanityFetch.ts, with the
// static data files kept as a build-time fallback).
export const service = defineType({
	name: 'service',
	title: 'Service',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			description: 'Short description used on the Services index and homepage teaser.',
			validation: (Rule) => Rule.required().max(240),
		}),
		defineField({
			name: 'intro',
			title: 'Intro',
			type: 'text',
			description: 'Longer intro paragraph shown in the hero of the service detail page.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'coverageOverview',
			title: 'Coverage overview',
			type: 'array',
			of: [{ type: 'string' }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'faq',
			title: 'FAQ',
			type: 'array',
			of: [{ type: 'faqItem' }],
		}),
		defineField({
			name: 'order',
			title: 'Display order',
			type: 'number',
		}),
	],
	preview: {
		select: { title: 'title' },
	},
});
