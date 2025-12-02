import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client configuration
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your_project_id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Set to false for fresh data, true for faster cached data
  token: import.meta.env.VITE_SANITY_TOKEN, // Optional: for authenticated requests
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper to check if Sanity is configured
export const isSanityConfigured = () => {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  return projectId && projectId !== 'your_project_id' && projectId !== 'your_project_id_here';
};
