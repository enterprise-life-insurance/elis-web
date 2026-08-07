import { defineField, defineType } from 'sanity';

// Four confirmed segments per ia/website-ia-sitemap.md: Business Owners/Trades,
// Medical Professionals, Engineers, Families & Individuals.
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
			name: 'heroImage',
			title: 'Hero image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'intro',
			title: 'Intro',
			type: 'array',
			of: [{ type: 'block' }],
			description: "This segment's risks/needs, in the tone set by brand/brand-voice-messaging.md.",
			validation: (Rule) => Rule.required(),
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
