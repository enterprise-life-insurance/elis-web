// Firm-wide contact details and primary call to action, shared by the contact page,
// footer, and Disclosure & Privacy page. Address/phones/Jay's email are from the
// client's "Website notes.docx" (brand/content-revision/, 2026-10-17). Still
// missing from the client: email addresses for quotes, Ekta and Glenn — Jay's is
// the only one shown for now (agreed 2026-10-20). Office hours are a tentative
// placeholder until the client confirms.

// Tentative offer — the 20-minute review length isn't confirmed by the client yet.
export const primaryCta = 'Book a 20-minute review';
export const primaryCtaShort = 'Book a Review';

export const office = {
	name: 'Enterprise Life Insurance & Investment Solutions Inc.',
	street: '1550 Kingston Road, Unit 316',
	city: 'Pickering, ON L1V 1C3',
	phone: '905-683-2323',
	hours: 'Monday to Friday, 9 a.m. – 5 p.m.',
	mapUrl: 'https://www.google.com/maps/search/?api=1&query=1550+Kingston+Road+Unit+316+Pickering+ON+L1V+1C3',
};

export const advisorContacts = [
	{ name: 'Jay Bablani', phone: '416-825-9620', email: 'jay.bablani@enterpriselife.ca' },
	{ name: 'Glenn Merkley', phone: '416-818-0518' },
	{ name: 'Ekta Balani', phone: '416-939-4585' },
] as { name: string; phone: string; email?: string }[];

export const insureLine = {
	name: 'InsureLine Brokers (Enterprise) Inc.',
	shortName: 'InsureLine Enterprise',
	url: 'https://insurelineenterprise.com',
};

export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, '')}`;
