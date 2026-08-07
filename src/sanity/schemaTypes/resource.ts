import { defineField, defineType } from 'sanity';

// Resources section: blog/guide articles and per-segment downloadable guides.
export const resource = defineType({
	name: 'resource',
	title: 'Resource',
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
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			validation: (Rule) => Rule.max(240),
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'downloadableGuide',
			title: 'Downloadable guide (optional)',
			type: 'file',
			description: 'PDF guide attached to this resource, if applicable.',
		}),
		defineField({
			name: 'relatedSegments',
			title: 'Related segments',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'segment' }] }],
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: 'advisor' }],
		}),
		defineField({
			name: 'publishDate',
			title: 'Publish date',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: { title: 'title', subtitle: 'publishDate', media: 'coverImage' },
	},
});
