import React, { useEffect, useMemo, useState } from 'react';
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
  const [rawPublications, setRawPublications] = useState<any[]>([]);
  const [selectedPublicationId, setSelectedPublicationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPubs = async () => {
      try {
        const data: any[] = await sanityClient.fetch(`*[_type == "publication"]{
          _id,
          title,
          titleAr,
          code,
          slug,
          publishedMonth,
          publishedYear,
          publishedDate,
          summary,
          summaryAr,
          body,
          bodyAr,
          authors,
          authorsAr,
          topics,
          topicsAr,
          heroImageUrl,
          heroImage{asset->{_ref}},
          attachments[]{asset->{_ref, url}},
          sourceUrl,
          externalUrl,
          pdfUrl,
          notes,
          notesAr
        } | order(publishedYear desc, publishedMonth desc)`);

        setRawPublications(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load publications');
        setLoading(false);
      }
    };

    fetchPubs();
  }, []);

  const publications = useMemo(() => {
    const isArabic = language === 'ar';

    const toPlainText = (blocks?: any[]) => {
      if (!blocks || !Array.isArray(blocks)) return '';
      return blocks
        .map((block: any) => (block.children || []).map((child: any) => child.text || '').join(''))
        .filter(Boolean)
        .join('\n\n');
    };

    return rawPublications.map((p) => {
      const id = p.slug?.current || p._id;
      const monthRaw = p.publishedMonth;
      let month = monthRaw;
      if (monthRaw && monthRaw.length === 2 && MONTH_REV[monthRaw]) month = MONTH_REV[monthRaw];
      const year = p.publishedYear || (p.publishedDate ? p.publishedDate.split('-')[0] : undefined);

      const authorsEn = (p.authors || [])
        .map((a: any) => (typeof a === 'string' ? a : a?.name))
        .filter(Boolean)
        .join(', ');
      const authorsAr = (p.authorsAr || [])
        .map((a: any) => (typeof a === 'string' ? a : a?.name))
        .filter(Boolean)
        .join(', ');
      const authors = isArabic && authorsAr ? authorsAr : authorsEn;

      const tags = isArabic && p.topicsAr?.length ? p.topicsAr : p.topics || [];

      const bodySelected = isArabic && p.bodyAr?.length ? p.bodyAr : p.body;
      const summarySelected = isArabic && p.summaryAr ? p.summaryAr : p.summary;
      const description = summarySelected || toPlainText(bodySelected) || '';

      const notes = isArabic && p.notesAr ? p.notesAr : p.notes;

      const imageUrl = p.heroImageUrl || refToImageUrl(p.heroImage?.asset?._ref);

      const title = (isArabic && p.titleAr) ? p.titleAr : (p.title || id);

      return {
        id,
        title,
        monogram: p.code || '',
        authors,
        month,
        year,
        tags,
        description,
        imageUrl,
        pdfUrl: p.pdfUrl,
        externalUrl: p.externalUrl || p.sourceUrl,
        notes,
        body: bodySelected,
      } as Publication;
    });
  }, [language, rawPublications]);

  const selectedPublication = useMemo(
    () => publications.find((p) => p.id === selectedPublicationId) || null,
    [publications, selectedPublicationId],
  );

  const handleClosePanel = () => setSelectedPublicationId(null);

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
            selectedId={selectedPublicationId}
            onSelectPublication={(pub) => setSelectedPublicationId(pub.id)}
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

      <Footer language={language} />
    </div>
  );
};

export default PublicationsPage;
