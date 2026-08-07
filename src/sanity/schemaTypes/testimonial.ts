import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
	name: 'testimonial',
	title: 'Testimonial',
	type: 'document',
	fields: [
		defineField({
			name: 'quote',
			title: 'Quote',
			type: 'text',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'authorName',
			title: 'Author name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'authorDetail',
			title: 'Author detail',
			type: 'string',
			description: 'e.g. job title, company, or segment (kept anonymized unless the client says otherwise).',
		}),
		defineField({
			name: 'relatedSegment',
			title: 'Related segment',
			type: 'reference',
			to: [{ type: 'segment' }],
		}),
		defineField({
			name: 'order',
			title: 'Display order',
			type: 'number',
		}),
	],
	preview: {
		select: { title: 'authorName', subtitle: 'quote' },
	},
});
