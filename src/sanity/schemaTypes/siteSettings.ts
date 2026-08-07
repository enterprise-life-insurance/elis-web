import { defineField, defineType } from 'sanity';

// Singleton — see sanity.config.ts structure customization, which pins this to a
// single "Site Settings" entry instead of a list.
export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fields: [
		defineField({
			name: 'siteTitle',
			title: 'Site title',
			type: 'string',
			initialValue: 'Enterprise Life',
		}),
		defineField({
			name: 'defaultSeoDescription',
			title: 'Default SEO description',
			type: 'text',
			validation: (Rule) => Rule.max(160),
		}),
		defineField({
			name: 'phone',
			title: 'Phone',
			type: 'string',
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'string',
		}),
		defineField({
			name: 'address',
			title: 'Address',
			type: 'text',
		}),
		defineField({
			name: 'socialLinks',
			title: 'Social links',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'socialLink',
					fields: [
						defineField({
							name: 'platform',
							title: 'Platform',
							type: 'string',
							options: {
								list: ['LinkedIn', 'Facebook', 'Instagram', 'YouTube', 'X'],
							},
						}),
						defineField({ name: 'url', title: 'URL', type: 'url' }),
					],
				},
			],
		}),
	],
	preview: {
		prepare: () => ({ title: 'Site Settings' }),
	},
});
