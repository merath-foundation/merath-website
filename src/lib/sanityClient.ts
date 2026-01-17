import {createClient} from '@sanity/client';

// Use browser-safe env access; avoid process.env to prevent ReferenceError in client bundle.
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'ghjc1eyf';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2025-01-01';
// Optional read token for private datasets; leave undefined for public read.
const token = import.meta.env.VITE_SANITY_READ_TOKEN;

// Disable CDN so published updates show up immediately after clicking Publish.
export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	token,
	perspective: 'published',
});
export const sanityConfig = {projectId, dataset};
