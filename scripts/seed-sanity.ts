// One-time/rerunnable seed: pushes the existing static content in src/data/*.ts
// into Sanity as real documents, so Studio isn't empty. Uses createOrReplace with
// deterministic IDs, so rerunning this after editing src/data/*.ts overwrites the
// seeded documents again — any content since edited directly in Studio for these
// same documents will be clobbered. It also discards any draft revision of those
// same documents (see discardStaleDrafts below), so an in-progress Studio edit
// gets wiped too — only rerun when Studio has no pending changes worth keeping.
//
// 2026-09-17: schema (src/sanity/schemaTypes/{segment,service,advisor}.ts,
// objects/faqItem.ts) was reshaped to match src/data/*.ts field-for-field (plain
// strings/string-arrays instead of portable-text blocks, plus new fields:
// segment.description/risks, service.intro, advisor.shortBio/tags/areasOfFocus).
// Documents seeded by the OLD version of this script are in the old shape and
// won't render correctly on the site until this is rerun.
//
// Run: pnpm seed  (needs SANITY_API_WRITE_TOKEN in .env — create one at
// sanity.io/manage -> API -> Tokens, with "Editor" permission)

import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

import { advisors } from '../src/data/advisors.ts';
import { segments } from '../src/data/segments.ts';
import { segmentDetails } from '../src/data/segmentDetails.ts';
import { services } from '../src/data/services.ts';
import { serviceDetails } from '../src/data/serviceDetails.ts';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION ?? '2026-08-07';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
	console.error('Missing PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env — aborting.');
	process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;

function toFaq(items: { question: string; answer: string }[]) {
	return items.map((item) => ({
		_type: 'faqItem' as const,
		_key: key(),
		question: item.question,
		answer: item.answer,
	}));
}

function toAreasOfFocus(items: { title: string; description: string }[]) {
	return items.map((item) => ({
		_type: 'areaOfFocus' as const,
		_key: key(),
		title: item.title,
		description: item.description,
	}));
}

const contentTypeFor = (path: string) => (extname(path).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg');

async function uploadHeadshot(publicPath: string) {
	const filePath = `public${publicPath}`;
	const buffer = readFileSync(filePath);
	const asset = await client.assets.upload('image', buffer, {
		filename: publicPath.split('/').pop(),
		contentType: contentTypeFor(publicPath),
	});
	return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id } };
}

async function seedAdvisors() {
	for (const [index, advisor] of advisors.entries()) {
		const headshot = await uploadHeadshot(advisor.image);
		await client.createOrReplace({
			_id: `advisor-${advisor.slug}`,
			_type: 'advisor',
			name: advisor.name,
			slug: { _type: 'slug', current: advisor.slug },
			role: advisor.role ?? '',
			headshot,
			shortBio: advisor.shortBio,
			bio: advisor.bio,
			tags: advisor.tags,
			areasOfFocus: toAreasOfFocus(advisor.areasOfFocus),
			licensedForLifeInsurance: advisor.slug !== 'glenn-merkley',
			order: index,
		});
		console.log(`  advisor: ${advisor.name}`);
	}
}

async function seedSegments() {
	for (const [index, segment] of segments.entries()) {
		const detail = segmentDetails.find((d) => d.slug === segment.slug);
		// Segments without a full detail page yet (e.g. mortgage-brokers, still
		// "coming soon") still need a card-level document so they appear in the
		// Who We Help / Home segment grids, which only read title/description/slug.
		await client.createOrReplace({
			_id: `segment-${segment.slug}`,
			_type: 'segment',
			title: segment.title,
			slug: { _type: 'slug', current: segment.slug },
			description: segment.description,
			intro: detail?.intro ?? '',
			risks: detail?.risks ?? [],
			calculatorNote: 'Coming soon',
			faq: toFaq(detail?.faq ?? []),
			order: index,
		});
		console.log(`  segment: ${segment.title}`);
	}
}

async function seedServices() {
	for (const [index, service] of services.entries()) {
		const detail = serviceDetails.find((d) => d.slug === service.slug);
		if (!detail) continue;
		await client.createOrReplace({
			_id: `service-${service.slug}`,
			_type: 'service',
			title: service.title,
			slug: { _type: 'slug', current: service.slug },
			description: service.description,
			intro: detail.intro,
			coverageOverview: detail.coverageOverview,
			faq: toFaq(detail.faq),
			order: index,
		});
		console.log(`  service: ${service.title}`);
	}
}

async function seedSiteSettings() {
	// Basic pass only — phone/email/address/socialLinks stay unset since none are
	// confirmed yet (see ContactInfo.astro). defaultSeoDescription reuses the
	// existing site-wide fallback from Layout.astro rather than writing new copy.
	// Enhanced SEO pass (real description, social links) comes later.
	await client.createOrReplace({
		_id: 'siteSettings',
		_type: 'siteSettings',
		siteTitle: 'Enterprise Life',
		defaultSeoDescription: 'Enterprise Life Insurance and Investment Solutions',
	});
	console.log('  siteSettings');
}

// createOrReplace only overwrites the PUBLISHED document. Studio still prefers an
// existing DRAFT over it if one exists, so a draft left over from before the
// 2026-09-17 schema reshape (old field shapes, e.g. `risks` as a string instead of
// an array) keeps showing as invalid in Studio and blocks publishing, even though
// the live site (which reads published documents, not drafts) is already correct.
// Discard those stale drafts after every reseed so Studio matches what's published.
async function discardStaleDrafts() {
	const ids = [
		...advisors.map((a) => `advisor-${a.slug}`),
		...segments.map((s) => `segment-${s.slug}`),
		...services.map((s) => `service-${s.slug}`),
		'siteSettings',
	];
	for (const id of ids) {
		await client.delete(`drafts.${id}`);
	}
	console.log(`  discarded ${ids.length} stale drafts (no-op for ids without one)`);
}

async function main() {
	console.log('Seeding advisors...');
	await seedAdvisors();
	console.log('Seeding segments...');
	await seedSegments();
	console.log('Seeding services...');
	await seedServices();
	console.log('Seeding site settings...');
	await seedSiteSettings();
	console.log('Discarding stale drafts...');
	await discardStaleDrafts();
	console.log('Done.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
