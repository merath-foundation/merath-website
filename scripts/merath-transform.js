import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const MONTH_MAP = {
  JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06', JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12',
};

const sourcePath = path.join(process.cwd(), 'merath-scrape.json');
const raw = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));

const docs = [];

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 96) || crypto.randomUUID();

const ensureId = (prefix, slug) => `${prefix}-${slug}`;

// Page and navigation extraction
raw.forEach((page) => {
  const slug = page.path === '/' ? 'home' : slugify(page.path.replace(/\//g, '-'));
  docs.push({
    _id: ensureId('page', slug),
    _type: 'page',
    title: page.title || slug,
    slug: {current: slug},
    body: page.bodyText.map((text) => ({_type: 'block', children: [{_type: 'span', text}]})),
    sections: [],
    sourceUrl: page.url,
  });
});

// Publications from listing
raw
  .filter((p) => p.path.startsWith('/publications'))
  .forEach((page) => {
    page.publications.forEach((pub, idx) => {
      const baseSlug = slugify(`${pub.monogram}-${pub.year}-${idx}`);
      docs.push({
        _id: ensureId('publication', baseSlug),
        _type: 'publication',
        title: pub.monogram || `Publication ${idx + 1}`,
        slug: {current: baseSlug},
        code: pub.monogram,
        publishedMonth: MONTH_MAP[pub.month?.toUpperCase?.() || ''] || undefined,
        publishedYear: pub.year ? Number(pub.year) : undefined,
        summary: '',
        body: [],
        authors: [],
        topics: [],
        heroImage: undefined,
        attachments: [],
        sourceUrl: page.url,
      });
    });
  });

// Navigation (global) from first page links
const navLinks = raw[0]?.links || [];
docs.push({
  _id: 'navigation-global',
  _type: 'navigation',
  title: 'Global Navigation',
  items: navLinks
    .filter((l) => l.href && l.href.startsWith('/'))
    .map((l, idx) => ({
      _type: 'navItem',
      label: l.text || l.href,
      href: new URL(l.href, raw[0].url).href,
      order: idx,
    })),
});

const ndjsonPath = path.join(process.cwd(), 'merath-export.ndjson');
const stream = fs.createWriteStream(ndjsonPath, 'utf-8');
docs.forEach((doc) => stream.write(`${JSON.stringify(doc)}\n`));
stream.end();
stream.on('finish', () => {
  console.log('Wrote', ndjsonPath, 'docs:', docs.length);
});