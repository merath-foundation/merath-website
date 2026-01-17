import fetch from 'node-fetch';
import {JSDOM} from 'jsdom';
import fs from 'fs';
import path from 'path';

const ORIGIN = process.env.MERATH_ORIGIN || 'http://localhost:3000';
const MAX_PAGES = Number(process.env.MAX_PAGES || 200);
const visited = new Set();
const queue = ['/'];
const output = [];

const isInternal = (href) => href && href.startsWith('/') && !href.startsWith('//');
const normalizeUrl = (href) => new URL(href, ORIGIN).href;

async function crawl() {
  while (queue.length && visited.size < MAX_PAGES) {
    const pathPart = queue.shift();
    if (!pathPart || visited.has(pathPart)) continue;
    visited.add(pathPart);

    const url = normalizeUrl(pathPart);
    console.log('Fetching', url);
    const res = await fetch(url);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) continue;
    const html = await res.text();
    const dom = new JSDOM(html);
    const {document} = dom.window;

    const title = document.querySelector('title')?.textContent?.trim() || '';
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map((el) => ({
      tag: el.tagName.toLowerCase(),
      text: el.textContent?.trim() || '',
    }));

    const images = Array.from(document.querySelectorAll('img')).map((img) => ({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || '',
    }));

    const links = Array.from(document.querySelectorAll('a')).map((a) => ({
      href: a.getAttribute('href') || '',
      text: a.textContent?.trim() || '',
    }));

    const bodyText = Array.from(document.querySelectorAll('main, article, section, p')).map((el) =>
      el.textContent?.trim() || ''
    ).filter(Boolean);

    // Extract publication cards on /publications
    const publications = [];
    if (pathPart.startsWith('/publications')) {
      const cards = Array.from(document.querySelectorAll('.publication-card'));
      cards.forEach((card) => {
        const monogram = card.querySelector('.publication-card-monogram')?.textContent?.trim() || '';
        const dateText = card.querySelector('.publication-card-date')?.textContent?.trim() || '';
        const match = dateText.match(/([A-Z]{3})\s*(\d{4})/);
        const month = match ? match[1] : '';
        const year = match ? match[2] : '';
        publications.push({monogram, month, year});
      });
    }

    output.push({
      url,
      path: pathPart,
      title,
      metaDescription,
      headings,
      images,
      links,
      bodyText,
      publications,
    });

    // enqueue internal links
    links
      .map((l) => l.href)
      .filter(isInternal)
      .forEach((href) => {
        const clean = href.split('#')[0];
        if (!visited.has(clean)) queue.push(clean);
      });
  }

  const dest = path.join(process.cwd(), 'merath-scrape.json');
  fs.writeFileSync(dest, JSON.stringify(output, null, 2), 'utf-8');
  console.log('Wrote', dest, 'pages:', output.length);
}

crawl().catch((err) => {
  console.error(err);
  process.exit(1);
});