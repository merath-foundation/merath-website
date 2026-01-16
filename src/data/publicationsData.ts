/**
 * Publications data store
 * Strongly typed publication objects with metadata for library-style browsing
 */

export type Publication = {
  id: string;
  title: string;
  monogram: string;      // Short code (2-3 chars) rendered on the card
  authors: string;
  month?: string;        // 3-letter month abbreviation (e.g., 'Jan', 'Feb')
  year: string;
  tags: string[];
  description: string;
  imageUrl: string;      // Placeholder path
  pdfUrl?: string;
  externalUrl?: string;
  notes?: string;
};

export const PUBLICATIONS_DATA: Publication[] = [
  {
    id: 'pub-001',
    title: 'Traces of Memory: Archival Practices in the Digital Age',
    monogram: 'TOM',
    authors: 'Sarah Chen, Marcus Webb, Leila Mostafa',
    month: 'NOV',
    year: '2024',
    tags: ['Archives', 'Digital Humanities', 'Memory Studies'],
    description:
      'An examination of how institutions preserve and curate cultural memory in the age of digital transformation. This publication explores the intersection of archival theory and practice, questioning canonical approaches to documentation and suggesting new frameworks for collective remembrance.',
    imageUrl: '/images/publications/traces-of-memory.jpg',
    pdfUrl: '#',
    notes: 'Part of the "Memory of the World" symposium series.',
  },
  {
    id: 'pub-002',
    title: 'Station of Commons: Reimagining Public Knowledge',
    monogram: 'SOC',
    authors: 'Collective Authors, Station of Commons Contributors',
    month: 'SEP',
    year: '2023',
    tags: ['Commons', 'Public Knowledge', 'Participatory Design'],
    description:
      'A manifesto and practical guide for creating shared spaces of knowledge production. Drawing from the Station of Commons model, this work advocates for distributed, community-driven approaches to learning and cultural exchange.',
    imageUrl: '/images/publications/station-commons.jpg',
    externalUrl: 'https://stationofcommons.org',
    pdfUrl: '#',
  },
  {
    id: 'pub-003',
    title: 'Against the Archive: Decolonial Epistemologies',
    monogram: 'ATA',
    authors: 'Dr. Amara Okonkwo, Priya Sharma',
    month: 'MAR',
    year: '2023',
    tags: ['Decolonialism', 'Archives', 'Epistemology'],
    description:
      'A critical intervention examining how Western institutional frameworks have shaped archival practices globally. Proposes alternative epistemologies rooted in non-Western knowledge systems and oral traditions.',
    imageUrl: '/images/publications/against-archive.jpg',
    pdfUrl: '#',
  },
  {
    id: 'pub-004',
    title: 'Digital Materiality: Objects and Networks in the Museum',
    monogram: 'DM',
    authors: 'James Chen, Rosalind Williams',
    month: 'JUN',
    year: '2024',
    tags: ['Digital Culture', 'Museums', 'Material Studies'],
    description:
      'Explores how museums negotiate the relationship between physical artifacts and their digital representations, asking what is gained and lost in the translation from object to image to data.',
    imageUrl: '/images/publications/digital-materiality.jpg',
    externalUrl: 'https://example.com/digital-materiality',
  },
  {
    id: 'pub-005',
    title: 'Feminist Futures: Technology and Care',
    monogram: 'FF',
    authors: 'Sofia Matos, Deepti Anand, collective',
    month: 'AUG',
    year: '2024',
    tags: ['Feminism', 'Technology', 'Care Ethics'],
    description:
      'Imagines technological futures grounded in feminist principles of care, interdependence, and collective flourishing. Includes case studies from grassroots tech collectives and community repair movements.',
    imageUrl: '/images/publications/feminist-futures.jpg',
    pdfUrl: '#',
    notes: 'Open-access publication.',
  },
  {
    id: 'pub-006',
    title: 'Indexing the Invisible: Cataloging Silence and Absence',
    monogram: 'ITV',
    authors: 'Michael K. Tran, Dr. Elena Rossi',
    month: 'DEC',
    year: '2023',
    tags: ['Archives', 'Metadata', 'Absence'],
    description:
      'A theoretical and practical exploration of what it means to archive that which is absent, suppressed, or deliberately excluded. Develops new cataloging vocabularies for the void.',
    imageUrl: '/images/publications/indexing-invisible.jpg',
    pdfUrl: '#',
  },
  {
    id: 'pub-007',
    title: 'Networks of Care: Solidarity in Crisis',
    monogram: 'NOC',
    authors: 'Dr. Yuki Tanaka, Contributors from Mutual Aid Networks',
    month: 'APR',
    year: '2024',
    tags: ['Care', 'Solidarity', 'Networks'],
    description:
      'Documents and theorizes the emergence of mutual aid and care networks in times of crisis. Includes interviews, zines, and reflections from practitioners building alternatives to institutional care systems.',
    imageUrl: '/images/publications/networks-care.jpg',
    externalUrl: 'https://careprojects.net',
  },
  {
    id: 'pub-008',
    title: 'The Library as Institution: Power, Access, and Resistance',
    monogram: 'LI',
    authors: 'Dr. Ahmad Hassan, Collective Research Group',
    month: 'JUL',
    year: '2023',
    tags: ['Libraries', 'Institutional Critique', 'Access'],
    description:
      'Interrogates the modern library not as a neutral repository but as a site of political struggle. Traces histories of censorship, resistance, and alternative library projects from around the world.',
    imageUrl: '/images/publications/library-institution.jpg',
    pdfUrl: '#',
    notes: 'Includes contributions in multiple languages.',
  },
  {
    id: 'pub-009',
    title: 'Ephemeral Publics: Temporary Spaces of Exchange',
    monogram: 'EP',
    authors: 'Curator Collective, Various Contributors',
    month: 'OCT',
    year: '2024',
    tags: ['Public Spaces', 'Temporary', 'Ephemeral'],
    description:
      'Celebrates and documents temporary interventions, pop-up libraries, and ephemeral public spaces that challenge permanent institutional models. Argues for the political and pedagogical value of transience.',
    imageUrl: '/images/publications/ephemeral-publics.jpg',
    pdfUrl: '#',
  },
];
