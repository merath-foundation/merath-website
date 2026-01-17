import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PublicationGrid from '../components/PublicationGrid';
import PublicationDetailPanel from '../components/PublicationDetailPanel';
import { sanityClient, sanityConfig } from '../lib/sanityClient';
import { Publication } from '../types/publication';
import './PublicationsPage.css';

interface PublicationsPageProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const MONTH_REV: Record<string, string> = {
  '01': 'JAN', '02': 'FEB', '03': 'MAR', '04': 'APR', '05': 'MAY', '06': 'JUN',
  '07': 'JUL', '08': 'AUG', '09': 'SEP', '10': 'OCT', '11': 'NOV', '12': 'DEC',
};

const refToImageUrl = (ref?: string) => {
  if (!ref) return undefined;
  const parts = ref.split('-');
  if (parts.length < 3) return undefined;
  const id = parts[1];
  const dim = parts[2];
  const format = parts[3] || 'jpg';
  return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}-${dim}.${format}`;
};

const PublicationsPage: React.FC<PublicationsPageProps> = ({ direction, language, setLanguage }) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPubs = async () => {
      try {
        const data: any[] = await sanityClient.fetch(`*[_type == "publication"]{
          _id, title, code, slug, publishedMonth, publishedYear, summary, body, authors[]->{name}, topics, heroImageUrl, heroImage{asset->{_ref}}, attachments[]{asset->{_ref, url}}, sourceUrl, externalUrl, pdfUrl, notes
        } | order(publishedYear desc, publishedMonth desc)`);

        const mapped: Publication[] = data.map((p) => {
          const id = p.slug?.current || p._id;
          const monthRaw = p.publishedMonth;
          let month = monthRaw;
          if (monthRaw && monthRaw.length === 2 && MONTH_REV[monthRaw]) month = MONTH_REV[monthRaw];
          const year = p.publishedYear || (p.publishedDate ? p.publishedDate.split('-')[0] : undefined);
          const authors = (p.authors || []).map((a: any) => a.name).join(', ');
          const imageUrl = p.heroImageUrl || refToImageUrl(p.heroImage?.asset?._ref);

          return {
            id,
            title: p.title || id,
            monogram: p.code || '',
            authors,
            month,
            year,
            tags: p.topics || [],
            description: p.summary || (p.body && Array.isArray(p.body) ? p.body.map((b: any) => (b.children||[]).map((c:any)=>c.text||'').join('')).join('\n\n') : ''),
            imageUrl,
            pdfUrl: p.pdfUrl,
            externalUrl: p.externalUrl || p.sourceUrl,
            notes: p.notes,
            body: p.body,
          };
        });

        setPublications(mapped);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load publications');
        setLoading(false);
      }
    };

    fetchPubs();
  }, []);

  const handleClosePanel = () => setSelectedPublication(null);

  return (
    <div className="publications-page" dir={direction}>
      <NavBar direction={direction} language={language} setLanguage={setLanguage} />

      <div className="publications-container">
        <div className="publications-header">
          <h1 className="publications-title">{language === 'ar' ? 'المنشورات' : 'Publications'}</h1>
          <p className="publications-subtitle">{language === 'ar' ? 'مجموعة مختارة من الأعمال والأبحاث المتعلقة بالثقافة والمعرفة والمشاعات' : 'A curated collection of writings and research related to culture, knowledge, and commons'}</p>
        </div>

        {loading && <p className="publications-loading">{language === 'ar' ? 'جاري التحميل...' : 'Loading publications...'}</p>}
        {error && <p className="publications-error">{error}</p>}

        <div className="publications-main">
          <PublicationGrid
            publications={publications}
            selectedId={selectedPublication?.id || null}
            onSelectPublication={setSelectedPublication}
            direction={direction}
          />
        </div>

        <PublicationDetailPanel
          publication={selectedPublication}
          isOpen={selectedPublication !== null}
          onClose={handleClosePanel}
          direction={direction}
          language={language}
        />
      </div>

      <Footer />
    </div>
  );
};

export default PublicationsPage;
