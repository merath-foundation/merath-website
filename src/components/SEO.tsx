import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
  readonly type?: 'website' | 'article';
  readonly url?: string;
}

export function Seo({
  title,
  description,
  image = 'https://images.unsplash.com/photo-1758186174447-282aaf601477?w=1200',
  type = 'website',
  url,
}: Readonly<SEOProps>) {
  const { language } = useLanguage();

  const defaultTitles = {
    en: 'Merath Cultural Foundation - Preserving Cultural Heritage',
    ar: 'مؤسسة ميراث الثقافية - حفظ التراث الثقافي',
  };

  const defaultDescriptions = {
    en: 'Preserving the narratives that shape our collective memory and cultural identity through innovative research, community engagement, and digital archiving.',
    ar: 'حفظ الروايات التي تشكل ذاكرتنا الجماعية وهويتنا الثقافية من خلال البحث المبتكر والمشاركة المجتمعية والأرشفة الرقمية.',
  };

  const finalTitle = title || defaultTitles[language];
  const finalDescription = description || defaultDescriptions[language];
  const finalUrl = url || globalThis.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_AR' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href={finalUrl} />
    </Helmet>
  );
}
