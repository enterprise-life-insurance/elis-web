import { defineField, defineType } from 'sanity';

// ⚠️ Glenn Merkley is not licensed for life insurance sales/servicing (confirmed by
// Jay Bablani, 2026-08-04 — see ia/website-ia-sitemap.md and CLAUDE.md). The
// `licensedForLifeInsurance` field below is an editorial flag, not an enforced
// constraint — anyone writing bio/credibility copy still needs to respect it by hand.
export const advisor = defineType({
	name: 'advisor',
	title: 'Advisor',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'name', maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'role',
			title: 'Role / Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'headshot',
			title: 'Headshot',
			type: 'image',
			options: { hotspot: true },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'bio',
			title: 'Bio',
			type: 'array',
			of: [{ type: 'block' }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'licensedForLifeInsurance',
			title: 'Licensed for life insurance sales/servicing?',
			type: 'boolean',
			description:
				'Editorial flag only — does not block content on its own. If false, bio/credibility copy for this advisor must not attribute life insurance sales or servicing to them anywhere on the site.',
			initialValue: true,
		}),
		defineField({
			name: 'qrCode',
			title: 'QR Code',
			type: 'image',
			description: "This advisor's individual QR code, linking to their profile page.",
		}),
		defineField({
			name: 'order',
			title: 'Display order',
			type: 'number',
		}),
	],
	preview: {
		select: { title: 'name', subtitle: 'role', media: 'headshot' },
	},
});
