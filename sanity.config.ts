import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { projectId, dataset, apiVersion } from './src/sanity/env';
import { schemaTypes } from './src/sanity/schemaTypes';

const singletonTypes = new Set(['siteSettings']);

export default defineConfig({
	name: 'enterprise-life',
	title: 'Enterprise Life',
	projectId,
	dataset,

	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						S.listItem()
							.title('Site Settings')
							.id('siteSettings')
							.child(S.document().schemaType('siteSettings').documentId('siteSettings')),
						S.divider(),
						...S.documentTypeListItems().filter(
							(listItem) => !singletonTypes.has(listItem.getId() ?? ''),
						),
					]),
		}),
		visionTool({ defaultApiVersion: apiVersion }),
	],

	schema: {
		types: schemaTypes,
	},
});
