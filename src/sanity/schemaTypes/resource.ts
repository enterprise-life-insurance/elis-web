import { defineField, defineType } from 'sanity';

// Resources section: blog posts, articles, and guides (incl. gated lead magnets),
// all one content shape differentiated by `format` + `gated` rather than split
// into separate document types.
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
			name: 'format',
			title: 'Format',
			type: 'string',
			description: 'Drives the content-type badge shown on the Resources page.',
			options: {
				list: [
					{ title: 'Blog Post', value: 'blog-post' },
					{ title: 'Article', value: 'article' },
					{ title: 'Guide', value: 'guide' },
				],
				layout: 'radio',
			},
			initialValue: 'blog-post',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'gated',
			title: 'Gated (lead magnet)',
			type: 'boolean',
			description:
				'When on, this resource requires an email/contact form before the download unlocks. UI shows a "Free Download" badge instead of naming it a "lead magnet" — that\'s internal marketing language, not user-facing.',
			initialValue: false,
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
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'tag' }] }],
			description: 'Topical tags (e.g. "Estate Planning") — distinct from Related segments below, which is audience.',
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
		select: { title: 'title', subtitle: 'format', media: 'coverImage' },
	},
});
