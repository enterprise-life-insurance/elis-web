// One-time/rerunnable seed: pushes the existing static content in src/data/*.ts
// into Sanity as real documents, so Studio isn't empty. Uses createOrReplace with
// deterministic IDs, so rerunning this after editing src/data/*.ts overwrites the
// seeded documents again — any content since edited directly in Studio for these
// same documents will be clobbered.
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

function toBlocks(paragraphs: string[]) {
	return paragraphs.map((text) => ({
		_type: 'block' as const,
		_key: key(),
		style: 'normal',
		markDefs: [],
		children: [{ _type: 'span' as const, _key: key(), text, marks: [] }],
	}));
}

function toBulletBlocks(items: string[]) {
	return items.map((text) => ({
		_type: 'block' as const,
		_key: key(),
		style: 'normal',
		listItem: 'bullet' as const,
		level: 1,
		markDefs: [],
		children: [{ _type: 'span' as const, _key: key(), text, marks: [] }],
	}));
}

function toFaq(items: { question: string; answer: string }[]) {
	return items.map((item) => ({
		_type: 'faqItem' as const,
		_key: key(),
		question: item.question,
		answer: toBlocks([item.answer]),
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
			bio: toBlocks(advisor.bio),
			licensedForLifeInsurance: advisor.slug !== 'glenn-merkley',
			order: index,
		});
		console.log(`  advisor: ${advisor.name}`);
	}
}

async function seedSegments() {
	for (const [index, segment] of segments.entries()) {
		const detail = segmentDetails.find((d) => d.slug === segment.slug);
		if (!detail) continue;
		await client.createOrReplace({
			_id: `segment-${segment.slug}`,
			_type: 'segment',
			title: segment.title,
			slug: { _type: 'slug', current: segment.slug },
			intro: [...toBlocks([detail.intro]), ...toBulletBlocks(detail.risks)],
			calculatorNote: 'Coming soon',
			faq: toFaq(detail.faq),
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
			summary: service.description,
			coverageOverview: toBulletBlocks(detail.coverageOverview),
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

async function main() {
	console.log('Seeding advisors...');
	await seedAdvisors();
	console.log('Seeding segments...');
	await seedSegments();
	console.log('Seeding services...');
	await seedServices();
	console.log('Seeding site settings...');
	await seedSiteSettings();
	console.log('Done.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
