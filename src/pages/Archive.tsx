import { useState } from 'react';
import { useSanity } from '../hooks/useSanity';
import { useLanguage } from '../contexts/LanguageContext';
import { urlFor } from '../lib/sanity';
import { LoadingSkeletons } from '../components/LoadingSkeletons';

interface Article {
  _id: string;
  title: { en: string; ar: string };
  slug: { current: string };
  category?: string;
  excerpt?: { en: string; ar: string };
  featuredImage?: any;
  publishedAt: string;
  author?: { en: string; ar: string };
}

export function Archive() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const query = selectedCategory === 'all' 
    ? `*[_type == "article"] | order(publishedAt desc)`
    : `*[_type == "article" && category == $category] | order(publishedAt desc)`;
  
  const params = selectedCategory === 'all' ? {} : { category: selectedCategory };
  const { data: articles, loading, error } = useSanity<Article[]>(query, params);

  const categories = [
    { value: 'all', label: { en: 'All', ar: 'الكل' } },
    { value: 'digital-archive', label: { en: 'Digital Archive', ar: 'الأرشيف الرقمي' } },
    { value: 'exhibition', label: { en: 'Exhibition', ar: 'معرض' } },
    { value: 'research', label: { en: 'Research', ar: 'بحث' } },
    { value: 'collection', label: { en: 'Collection', ar: 'مجموعة' } },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'en' 
      ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="archive-page">
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4">
              {language === 'en' ? 'Archive & Exhibition Production' : 'الأرشيف وإنتاج المعارض'}
            </h1>
            <div className="w-16 h-0.5 bg-black/20"></div>
          </div>

          {/* Static Content Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
              {language === 'en' ? 'Digital Archive' : 'الأرشيف الرقمي'}
            </h2>
            <div className="max-w-3xl">
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                {language === 'en' 
                  ? 'Our digital archive preserves cultural materials in accessible formats, ensuring long-term conservation and broad public access. We employ professional archival standards to digitize photographs, documents, recordings, and artifacts.'
                  : 'يحفظ أرشيفنا الرقمي المواد الثقافية بتنسيقات يسهل الوصول إليها، مما يضمن الحفظ طويل الأمد والوصول العام الواسع. نحن نستخدم معايير أرشفة احترافية لرقمنة الصور والوثائق والتسجيلات والقطع الأثرية.'}
              </p>
              <p className="text-lg text-black/70 leading-relaxed">
                {language === 'en'
                  ? 'Each item is carefully catalogued with rich metadata, making our collections searchable and meaningful for researchers, educators, and community members around the world.'
                  : 'يتم فهرسة كل عنصر بعناية مع بيانات وصفية غنية، مما يجعل مجموعاتنا قابلة للبحث وذات مغزى للباحثين والمعلمين وأفراد المجتمع حول العالم.'}
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
              {language === 'en' ? 'Exhibition Production' : 'إنتاج المعارض'}
            </h2>
            <div className="max-w-3xl">
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                {language === 'en'
                  ? 'We design and produce exhibitions that transform archival materials into immersive cultural experiences. Our exhibitions combine traditional display methods with interactive digital components to engage diverse audiences.'
                  : 'نصمم وننتج معارض تحول المواد الأرشيفية إلى تجارب ثقافية غامرة. تجمع معارضنا بين طرق العرض التقليدية والمكونات الرقمية التفاعلية لإشراك جماهير متنوعة.'}
              </p>
              <p className="text-lg text-black/70 leading-relaxed">
                {language === 'en'
                  ? 'From concept development through installation, we work closely with communities and cultural institutions to create exhibitions that honor heritage while inviting contemporary dialogue.'
                  : 'من تطوير المفهوم إلى التثبيت، نعمل بشكل وثيق مع المجتمعات والمؤسسات الثقافية لإنشاء معارض تكرم التراث مع دعوة الحوار المعاصر.'}
              </p>
            </div>
          </div>

          {/* Articles Section */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              {language === 'en' ? 'Articles & Resources' : 'المقالات والموارد'}
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-black text-white'
                      : 'bg-black/5 text-black hover:bg-black/10'
                  }`}
                >
                  {cat.label[language]}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            {loading && <LoadingSkeletons count={3} />}
            
            {error && (
              <div className="text-center py-12">
                <p className="text-black/60">
                  {language === 'en' 
                    ? 'Unable to load articles. Please check your Sanity configuration.'
                    : 'غير قادر على تحميل المقالات. يرجى التحقق من تكوين Sanity الخاص بك.'}
                </p>
              </div>
            )}

            {!loading && !error && articles?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-black/60">
                  {language === 'en' 
                    ? 'No articles available yet. Check back soon!'
                    : 'لا توجد مقالات متاحة حتى الآن. تحقق مرة أخرى قريبا!'}
                </p>
              </div>
            )}

            {!loading && !error && articles && articles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <article 
                    key={article._id}
                    className="group cursor-pointer"
                  >
                    {article.featuredImage && (
                      <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-black/5">
                        <img
                          src={urlFor(article.featuredImage).width(800).height(600).url()}
                          alt={article.featuredImage.alt || article.title[language]}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {article.category && (
                        <span className="text-xs uppercase tracking-wider text-black/50">
                          {categories.find(c => c.value === article.category)?.label[language]}
                        </span>
                      )}
                      
                      <h3 className="text-xl font-light text-black group-hover:text-black/70 transition-colors">
                        {article.title[language]}
                      </h3>
                      
                      {article.excerpt && (
                        <p className="text-sm text-black/60 line-clamp-3">
                          {article.excerpt[language]}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3 text-xs text-black/50 pt-2">
                        <time dateTime={article.publishedAt}>
                          {formatDate(article.publishedAt)}
                        </time>
                        {article.author && (
                          <>
                            <span>•</span>
                            <span>{article.author[language]}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
