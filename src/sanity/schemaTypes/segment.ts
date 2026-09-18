import { defineField, defineType } from 'sanity';

// Eight confirmed segments per Jay Bablani, client call 2026-08-28 (see
// src/data/segments.ts). Schema shape matches Segment/SegmentDetail in
// src/data/{segments,segmentDetails}.ts exactly, so Studio content is a 1:1
// source for the site (via safeFetch in src/lib/sanityFetch.ts, with the
// static data files kept as a build-time fallback).
export const segment = defineType({
	name: 'segment',
	title: 'Who We Help — Segment',
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
			description: 'Short card blurb — used on the Who We Help index and the Home page segment cards.',
			validation: (Rule) => Rule.required().max(240),
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'intro',
			title: 'Intro',
			type: 'text',
			description: "This segment's intro paragraph, in the tone set by brand/brand-voice-messaging.md.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'risks',
			title: 'Risks / what we help you plan for',
			type: 'array',
			of: [{ type: 'string' }],
			description: 'Bulleted list rendered under "What We Help You Plan For" on the segment detail page.',
		}),
		defineField({
			name: 'calculatorNote',
			title: 'Calculator (placeholder)',
			type: 'string',
			description:
				'Which calculator/tool this segment page should embed — specific calculators are still unconfirmed (see ia/website-ia-sitemap.md open items). Free text for now; may become a reference once Tools are defined.',
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
		select: { title: 'title', media: 'heroImage' },
	},
});
