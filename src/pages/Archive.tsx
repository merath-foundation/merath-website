import { useState } from 'react';
import { useSanity } from '../hooks/useSanity';
import { useLanguage } from '../contexts/LanguageContext';
import { LoadingSkeletons } from '../components/LoadingSkeletons';

interface Article {
  _id: string;
  title: { en: string; ar: string };
  slug: { current: string };
  category?: string;
  excerpt?: { en: string; ar: string };
  featuredImage?: unknown;
  publishedAt: string;
  author?: { en: string; ar: string };
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: { en: 'All', ar: 'الكل' } },
  { value: 'digital-archive', label: { en: 'Digital Archive', ar: 'الأرشيف الرقمي' } },
  { value: 'exhibition', label: { en: 'Exhibition', ar: 'معرض' } },
  { value: 'research', label: { en: 'Research', ar: 'بحث' } },
  { value: 'collection', label: { en: 'Collection', ar: 'مجموعة' } },
];

export function Archive() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const query = selectedCategory === 'all'
    ? '*[_type == "article"] | order(publishedAt desc)'
    : '*[_type == "article" && category == $category] | order(publishedAt desc)';

  const params = selectedCategory === 'all' ? {} : { category: selectedCategory };
  const { data: articles, loading, error } = useSanity<Article[]>(query, params);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'en'
      ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="home-page">
      <section className="room room--archive room--hero">
        <div className="room__grid">
          <div className="room__column room__column--stack">
            <p className="room__kicker">{language === 'en' ? 'Archive' : 'الأرشيف'}</p>
            <h1 className="room__subtitle">
              {language === 'en' ? 'Archive & Exhibition Production' : 'الأرشيف وإنتاج المعارض'}
            </h1>
            <p className="room__copy">
              {language === 'en'
                ? 'Digitisation suites, exhibition studios, and research correspondences interlace here. Use the ledger below to sift through recent dispatches.'
                : 'أجنحة الرقمنة واستوديوهات المعارض والمراسلات البحثية تتقاطع هنا. استخدم الدفتر أدناه لاستعراض الإرسالات الحديثة.'}
            </p>
          </div>
          <div className="room__column room__column--stack">
            <p className="room__note">
              {language === 'en'
                ? 'Filters behave like radio waves—switch channels to surface a subset of records.'
                : 'تتصرف المرشحات كموجات راديو؛ غيّر القناة لتُظهر مجموعة فرعية من السجلات.'}
            </p>
          </div>
        </div>
      </section>

      <section className="room room--archive-ledger">
        <div className="archive-filter">
          {CATEGORY_OPTIONS.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`archive-filter__pill ${selectedCategory === cat.value ? 'is-active' : ''}`}
            >
              {cat.label[language]}
            </button>
          ))}
        </div>

        {loading && <LoadingSkeletons count={3} />}

        {error && (
          <p className="room__note" role="status">
            {language === 'en'
              ? 'Unable to load the archive right now.'
              : 'تعذر تحميل الأرشيف في الوقت الحالي.'}
          </p>
        )}

        {!loading && !error && articles?.length === 0 && (
          <p className="room__note">
            {language === 'en'
              ? 'No records in this channel yet. Switch filters or return later.'
              : 'لا توجد سجلات في هذه القناة بعد. جرّب مرشحاً آخر أو عد لاحقاً.'}
          </p>
        )}

        {!loading && !error && articles && articles.length > 0 && (
          <ol className="article-ledger">
            {articles.map(article => (
              <li key={article._id}>
                <div>
                  <p className="article-ledger__label">
                    {article.category
                      ? CATEGORY_OPTIONS.find(c => c.value === article.category)?.label[language]
                      : language === 'en'
                        ? 'Field note'
                        : 'ملاحظة ميدانية'}
                  </p>
                  <h3>{article.title[language]}</h3>
                  {article.excerpt && <p>{article.excerpt[language]}</p>}
                </div>
                <div className="article-ledger__meta">
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                  {article.author && <span>{article.author[language]}</span>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
