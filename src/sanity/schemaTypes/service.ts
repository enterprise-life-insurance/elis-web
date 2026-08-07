import { defineField, defineType } from 'sanity';

// Five confirmed services per ia/website-ia-sitemap.md: Life Insurance, Disability
// Insurance, Group Benefits, Financial & Estate Planning, Travel Insurance.
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
			name: 'summary',
			title: 'Summary',
			type: 'text',
			description: 'Short description used on the Services index and homepage teaser.',
			validation: (Rule) => Rule.max(240),
		}),
		defineField({
			name: 'coverageOverview',
			title: 'Coverage overview',
			type: 'array',
			of: [{ type: 'block' }],
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
