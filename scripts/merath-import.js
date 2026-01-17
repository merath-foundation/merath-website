import fs from 'fs';
import sanityClient from '@sanity/client';
import sanityImport from '@sanity/import';

const projectId = process.env.SANITY_PROJECT_ID || '<PROJECT_ID>';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN || '<WRITE_TOKEN>';

const client = sanityClient({projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false});

const inputPath = process.env.MERATH_EXPORT || 'merath-export.ndjson';
const input = fs.createReadStream(inputPath);

sanityImport(input, {
  client,
  operation: 'createOrReplace',
  allowAssetsInDifferentDataset: false,
  allowFailingAssets: false,
})
  .then(({numDocs, warnings}) => {
    console.log('Imported %d documents', numDocs);
    if (warnings?.length) {
      console.warn('Warnings:', warnings);
    }
  })
  .catch((err) => {
    console.error('Import failed:', err.message);
    process.exit(1);
  });