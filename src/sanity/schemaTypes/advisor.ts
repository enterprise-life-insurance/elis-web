import { defineField, defineType } from 'sanity';

// ⚠️ Glenn Merkley is not licensed for life insurance sales/servicing (confirmed by
// Jay Bablani, 2026-08-04 — see ia/website-ia-sitemap.md and CLAUDE.md). The
// `licensedForLifeInsurance` field below is an editorial flag, not an enforced
// constraint — anyone writing bio/credibility copy still needs to respect it by hand.
// Schema shape matches Advisor in src/data/advisors.ts exactly, so Studio content is
// a 1:1 source for the site (via safeFetch in src/lib/sanityFetch.ts, with the
// static data file kept as a build-time fallback).
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
			name: 'shortBio',
			title: 'Short bio',
			type: 'string',
			description: 'One-line summary shown on the About team grid card.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'bio',
			title: 'Bio',
			type: 'array',
			of: [{ type: 'text' }],
			description: 'Full bio, one paragraph per array item — rendered as separate <p> tags on the profile page.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'tags',
			title: 'Credential tags',
			type: 'array',
			of: [{ type: 'string' }],
			description: 'Short credential/credibility chips shown in the profile hero (e.g. "RIBO Certified").',
		}),
		defineField({
			name: 'areasOfFocus',
			title: 'Areas of focus',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'areaOfFocus',
					fields: [
						defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
						defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
					],
					preview: { select: { title: 'title', subtitle: 'description' } },
				},
			],
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
			description:
				"Unused — each advisor profile page generates its QR code at build time from the qrcode package instead. Left here in case that changes.",
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
