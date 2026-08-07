import type { SchemaTypeDefinition } from 'sanity';

import { advisor } from './advisor';
import { service } from './service';
import { segment } from './segment';
import { resource } from './resource';
import { testimonial } from './testimonial';
import { siteSettings } from './siteSettings';
import { faqItem } from './objects/faqItem';

export const schemaTypes: SchemaTypeDefinition[] = [
	// Documents
	advisor,
	service,
	segment,
	resource,
	testimonial,
	siteSettings,
	// Objects
	faqItem,
];
