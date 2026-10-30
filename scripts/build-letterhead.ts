// Builds the letterhead downloads on /brand (public/brand/kit/letterhead/) from one
// source per design: print PDFs and page renders via headless Chrome, Word
// template + document via docx, web previews via sharp, then refreshes the kit zip.
// Rerun after changing contact details (src/data/site.ts) or the social handle.
//
//   pnpm build:letterhead        (CHROME_PATH overrides the macOS Chrome location)
//
// Designs approved 2026-10-30: "Classic" (option 01) and "Leaf" (option 03).
// Word files place the letterhead artwork as one page-sized image behind the text
// on the first page only, so they look identical without Poppins installed; the
// letter text itself is set in Poppins (falls back if the font isn't installed).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import {
	AlignmentType,
	Document,
	Footer,
	Header,
	HorizontalPositionRelativeFrom,
	ImageRun,
	LineRuleType,
	Packer,
	PageNumber,
	Paragraph,
	TextRun,
	TextWrappingType,
	VerticalPositionRelativeFrom,
} from 'docx';
import { office } from '../src/data/site.ts';

// Temporary until the client locks the Facebook/Instagram usernames (2026-10-30).
const SOCIAL_HANDLE = '@enterprise.life';
const WEBSITE = 'enterpriselife.ca';
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const root = resolve(import.meta.dirname, '..');
const kitDir = join(root, 'public/brand/kit');
const outDir = join(kitDir, 'letterhead');
const tmp = mkdtempSync(join(tmpdir(), 'elis-letterhead-'));
const fileUrl = (path: string) => pathToFileURL(join(root, path)).href;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ---------- HTML source ----------

const logo = fileUrl('brand/logo/ELIS-logo-color-primary.svg');

const fontFaces = [400, 500, 600]
	.map(
		(w) =>
			`@font-face{font-family:Poppins;font-weight:${w};src:url(${fileUrl(`node_modules/@fontsource/poppins/files/poppins-latin-${w}-normal.woff2`)}) format('woff2')}`,
	)
	.join('');

const icons = (size: number) => `
<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#0061A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#0061A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`;

// Shown only in the web previews, so viewers see how a letter sits on the page.
const sampleLetter = `
<div class="letter">
<p>October 30, 2026</p>
<p>[Recipient Name]<br>[Company]<br>[Street Address]<br>[City, Province Postal Code]</p>
<p style="font-weight:600;color:#0061A6">Re: [Subject line]</p>
<p>Dear [Recipient Name],</p>
<p>Thank you for taking the time to meet with us. As discussed, this letter outlines the next steps in reviewing your current coverage and the information we’ll need before our follow-up conversation.</p>
<p>Our goal is to give you a clear picture of what your existing policies cover today, where the gaps are, and which options make sense for your situation. There is no obligation, and nothing changes until you decide it should.</p>
<p>If you have any questions in the meantime, please don’t hesitate to reach out.</p>
<p>Sincerely,</p>
<div style="height:36px"></div>
<p style="font-weight:600">[Your Name]<br><span style="font-weight:400;color:#686868">[Title], Enterprise Life</span></p>
</div>`;

const classic = (body: string) => `
<div class="sheet">
	<div style="display:flex;justify-content:space-between;align-items:center">
		<img src="${logo}" alt="${esc(office.name)}" style="width:280px;display:block">
		<div style="text-align:right;font-size:12px;line-height:1.6;color:#4A4A4A">
			<div>${esc(office.street)}</div>
			<div>${esc(office.city)}</div>
			<div style="color:#0061A6;font-weight:500">${office.phone} · ${WEBSITE}</div>
		</div>
	</div>
	<div style="display:flex;align-items:center;margin-top:28px">
		<div style="width:72px;height:3px;background:#85BD2D"></div>
		<div style="flex:1;height:1px;background:#E1E1E1"></div>
	</div>
	${body && `<div style="margin-top:56px">${body}</div>`}
	<div style="position:absolute;left:72px;right:72px;bottom:44px;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#686868;border-top:1px solid #E1E1E1;padding-top:14px">
		<span>${esc(office.name)}</span>
		<div style="display:flex;align-items:center;gap:8px">${icons(14)}<span style="color:#0061A6;font-weight:500">${SOCIAL_HANDLE}</span></div>
	</div>
</div>`;

const leafColumn = (label: string, rule: string, content: string) => `
<div style="display:flex;flex-direction:column;gap:4px;border-top:3px solid ${rule};padding-top:12px">
	<span style="font-weight:600;letter-spacing:0.12em;color:#0061A6">${label}</span>
	${content}
</div>`;

const leaf = (body: string) => `
<div class="sheet">
	<div style="position:absolute;top:-90px;right:-90px;width:270px;height:270px;background:#0061A6;border-radius:0 0 0 135px"></div>
	<div style="position:absolute;top:196px;right:-70px;width:140px;height:140px;background:#85BD2D;border-radius:70px 0 70px 0"></div>
	<img src="${logo}" alt="${esc(office.name)}" style="width:270px;display:block">
	${body && `<div style="margin-top:72px;padding-right:8px">${body}</div>`}
	<div style="position:absolute;left:72px;right:72px;bottom:48px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;font-size:12px;line-height:1.55;color:#333">
		${leafColumn('OFFICE', '#0061A6', `<span>${esc(office.street)}<br>${esc(office.city)}</span>`)}
		${leafColumn('PHONE', '#85BD2D', `<span>${office.phone}</span>`)}
		${leafColumn('ONLINE', '#E1E1E1', `<span>${WEBSITE}</span><div style="display:flex;align-items:center;gap:6px">${icons(13)}<span>${SOCIAL_HANDLE}</span></div>`)}
	</div>
</div>`;

// bleed: adds 0.125in on every side for print shops; the leaf shapes already extend
// past the trim edge, so they fill the bleed on their own.
const page = (sheet: string, bleed = false) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
${fontFaces}
@page{size:${bleed ? '8.75in 11.25in' : '8.5in 11in'};margin:0}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{margin:0;background:#fff}
body{font-family:Poppins,sans-serif;color:#222}
.sheet{width:816px;height:1056px;position:relative;overflow:hidden;background:#fff;padding:64px 72px 0}
${bleed ? '.bleed{width:840px;height:1080px;position:relative;overflow:hidden}.bleed .sheet{position:absolute;left:12px;top:12px;overflow:visible}' : ''}
.letter{display:flex;flex-direction:column;gap:14px;font-size:14px;line-height:1.65}
.letter p{margin:0}
</style></head><body>${bleed ? `<div class="bleed">${sheet}</div>` : sheet}</body></html>`;

// ---------- Rendering ----------

const writeHtml = (name: string, html: string) => {
	const path = join(tmp, `${name}.html`);
	writeFileSync(path, html);
	return pathToFileURL(path).href;
};

const chrome = (args: string[]) =>
	execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars', '--virtual-time-budget=3000', ...args], {
		stdio: 'ignore',
	});

const printPdf = (url: string, out: string) => chrome(['--no-pdf-header-footer', `--print-to-pdf=${out}`, url]);

const screenshot = (url: string, out: string, scale: number) =>
	chrome(['--window-size=816,1056', `--force-device-scale-factor=${scale}`, `--screenshot=${out}`, url]);

// ---------- Word ----------

const twip = (inches: number) => Math.round(inches * 1440);
const smallLogo = readFileSync(join(kitDir, 'ELIS-logo-color-primary.png'));

const para = (text: string, opts: { bold?: boolean; color?: string; after?: number } = {}) =>
	new Paragraph({
		spacing: opts.after === undefined ? undefined : { after: opts.after },
		children: [new TextRun({ text, bold: opts.bold, color: opts.color })],
	});

// headerIn / footerIn: how far the first page's letterhead artwork reaches in from
// the top and bottom edges, so the letter text starts below it and stops above it.
// Later pages fall back to the normal 1in / 0.9in margins with a small logo header.
const buildDocx = async (artPng: string, title: string, headerIn: number, footerIn: number) => {
	const headerDistance = 0.5;
	const footerDistance = 0.4;

	const doc = new Document({
		title,
		creator: 'Enterprise Life Insurance & Investment Solutions Inc.',
		styles: {
			default: {
				document: {
					run: { font: 'Poppins', size: 21, color: '222222' },
					paragraph: { spacing: { after: 210, line: 336 } },
				},
			},
		},
		sections: [
			{
				properties: {
					titlePage: true,
					page: {
						size: { width: 12240, height: 15840 },
						margin: { top: twip(1), bottom: twip(0.9), left: twip(0.75), right: twip(0.75), header: twip(headerDistance), footer: twip(footerDistance) },
					},
				},
				headers: {
					first: new Header({
						children: [
							new Paragraph({
								spacing: { before: 0, after: 0, line: twip(headerIn - headerDistance), lineRule: LineRuleType.EXACT },
								children: [
									new ImageRun({
										type: 'png',
										data: readFileSync(artPng),
										transformation: { width: 816, height: 1056 },
										altText: { name: 'Letterhead', title: 'Enterprise Life letterhead', description: 'Enterprise Life letterhead artwork' },
										floating: {
											horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 },
											verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: 0 },
											behindDocument: true,
											allowOverlap: true,
											wrap: { type: TextWrappingType.NONE },
										},
									}),
								],
							}),
						],
					}),
					default: new Header({
						children: [
							new Paragraph({
								spacing: { after: 0 },
								children: [new ImageRun({ type: 'png', data: smallLogo, transformation: { width: 154, height: 31 }, altText: { name: 'Logo', title: 'Enterprise Life', description: 'Enterprise Life logo' } })],
							}),
						],
					}),
				},
				footers: {
					first: new Footer({
						children: [new Paragraph({ spacing: { before: 0, after: 0, line: twip(footerIn - footerDistance), lineRule: LineRuleType.EXACT }, children: [] })],
					}),
					default: new Footer({
						children: [
							new Paragraph({
								alignment: AlignmentType.CENTER,
								spacing: { after: 0 },
								children: [
									new TextRun({ text: `${office.name}  ·  Page `, size: 16, color: '686868' }),
									new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '686868' }),
								],
							}),
						],
					}),
				},
				children: [
					para('[Date]'),
					para('[Recipient Name]', { after: 0 }),
					para('[Company]', { after: 0 }),
					para('[Street Address]', { after: 0 }),
					para('[City, Province Postal Code]'),
					para('Re: [Subject line]', { bold: true, color: '0061A6' }),
					para('Dear [Recipient Name],'),
					para('[Start typing your letter here.]'),
					para('Sincerely,', { after: 720 }),
					para('[Your Name]', { bold: true, after: 0 }),
					para('[Title], Enterprise Life', { color: '686868' }),
				],
			},
		],
	});
	return Packer.toBuffer(doc);
};

// A .dotx is a .docx whose main part is declared as a template, so double-clicking
// it in Word opens a new untitled letter instead of the template itself.
const toDotx = (docxPath: string, dotxPath: string) => {
	const dir = join(tmp, `dotx-${Math.random().toString(36).slice(2)}`);
	mkdirSync(dir);
	execFileSync('unzip', ['-q', docxPath, '-d', dir]);
	const ct = join(dir, '[Content_Types].xml');
	writeFileSync(ct, readFileSync(ct, 'utf8').replace('wordprocessingml.document.main+xml', 'wordprocessingml.template.main+xml'));
	rmSync(dotxPath, { force: true });
	execFileSync('zip', ['-X', '-q', '-r', dotxPath, '.'], { cwd: dir });
};

// ---------- Build ----------

const designs = [
	{ slug: 'classic', name: 'Classic', sheet: classic, headerIn: 2.15, footerIn: 1.15, bleed: false },
	{ slug: 'leaf', name: 'Leaf', sheet: leaf, headerIn: 2.05, footerIn: 1.7, bleed: true },
];

mkdirSync(outDir, { recursive: true });

for (const d of designs) {
	const base = join(outDir, `ELIS-letterhead-${d.slug}`);
	const blankUrl = writeHtml(`${d.slug}-blank`, page(d.sheet('')));

	printPdf(blankUrl, `${base}.pdf`);
	if (d.bleed) printPdf(writeHtml(`${d.slug}-bleed`, page(d.sheet(''), true)), `${base}-print-bleed.pdf`);

	const art = join(tmp, `${d.slug}-art.png`);
	screenshot(blankUrl, art, 3.125); // 2550×3300 = 300 dpi on Letter

	const sample = join(tmp, `${d.slug}-sample.png`);
	screenshot(writeHtml(`${d.slug}-sample`, page(d.sheet(sampleLetter))), sample, 2);
	await sharp(sample).resize({ width: 800 }).webp({ quality: 86 }).toFile(`${base}-preview.webp`);

	writeFileSync(`${base}.docx`, await buildDocx(art, `Enterprise Life Letterhead — ${d.name}`, d.headerIn, d.footerIn));
	toDotx(`${base}.docx`, `${base}.dotx`);
	console.log(`Built ${d.name}`);
}

// Refresh the "Download kit" zip so it carries the letterheads too.
const kitFiles = [
	'ELIS-colors.txt',
	...['favicon-square-inverse', 'favicon-square-primary', 'logo-color-primary', 'logo-color-secondary', 'logo-stacked-tagline', 'wordmark-color'].flatMap((n) => [
		`ELIS-${n}.svg`,
		`ELIS-${n}.png`,
	]),
	...designs.flatMap((d) => {
		const b = `letterhead/ELIS-letterhead-${d.slug}`;
		return [`${b}.pdf`, `${b}.docx`, `${b}.dotx`, ...(d.bleed ? [`${b}-print-bleed.pdf`] : [])];
	}),
];
// Built in the temp dir and written over the old file in place: deleting and
// recreating it makes the synced Documents folder leave an "ELIS-brand-kit 2.zip".
const zipTmp = join(tmp, 'ELIS-brand-kit.zip');
execFileSync('zip', ['-X', '-q', zipTmp, ...kitFiles], { cwd: kitDir });
writeFileSync(join(kitDir, 'ELIS-brand-kit.zip'), readFileSync(zipTmp));

rmSync(tmp, { recursive: true, force: true });
console.log('Letterhead files written to public/brand/kit/letterhead/');
