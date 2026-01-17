import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import {visionTool} from '@sanity/vision';
import {schemaTypes} from './schemaTypes';

const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'ghjc1eyf';
const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'merath-studio',
  title: 'Merath Studio',
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: false,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});