import { useState } from 'react';
<<<<<<< HEAD
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
=======
import { useLanguage } from '../contexts/LanguageContext';

const exhibitions = [
  {
    titleEn: 'Traces: Material Memory',
    titleAr: 'آثار: الذاكرة المادية',
    year: '2023',
    descriptionEn: 'An exhibition exploring the relationship between objects and memory, featuring artifacts from private collections alongside contemporary artistic responses.',
    descriptionAr: 'معرض يستكشف العلاقة بين الأشياء والذاكرة، ويضم قطعًا أثرية من مجموعات خاصة إلى جانب الاستجابات الفنية المعاصرة.',
  },
  {
    titleEn: 'Soundscapes of the Souk',
    titleAr: 'مناظر صوتية للسوق',
    year: '2024',
    descriptionEn: 'A multimedia installation combining field recordings, oral histories, and visual documentation to recreate the acoustic environment of traditional markets.',
    descriptionAr: 'تركيب متعدد الوسائط يجمع بين التسجيلات الميدانية والتواريخ الشفوية والتوثيق البصري لإعادة إنشاء البيئة الصوتية للأسواق التقليدية.',
  },
  {
    titleEn: 'Textile Dialogues',
    titleAr: 'حوارات النسيج',
    year: '2023',
    descriptionEn: 'Showcasing historical textiles alongside contemporary works that engage with traditional techniques and patterns in new contexts.',
    descriptionAr: 'عرض المنسوجات التاريخية إلى جانب الأعمال المعاصرة التي تتفاعل مع التقنيات والأنماط التقليدية في سياقات جديدة.',
  },
  {
    titleEn: 'Family Albums',
    titleAr: 'ألبومات العائلة',
    year: '2024',
    descriptionEn: 'Presenting photographs from community collections that document daily life, celebrations, and transformations across decades.',
    descriptionAr: 'تقديم صور من المجموعات المجتمعية التي توثق الحياة اليومية والاحتفالات والتحولات عبر العقود.',
  },
  {
    titleEn: 'Architecture of Belonging',
    titleAr: 'عمارة الانتماء',
    year: '2022',
    descriptionEn: 'Documentation of vernacular architecture and its role in shaping community identity and social relationships.',
    descriptionAr: 'توثيق العمارة الشعبية ودورها في تشكيل الهوية المجتمعية والعلاقات الاجتماعية.',
  },
];

export function Archive() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', description: '', consent: false });
    alert(language === 'en' ? 'Thank you for your contribution!' : 'شكراً لمساهمتك!');
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="eatable-text mb-16">
          {t('archive.title')}
        </h1>

        {/* Intro Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="eatable-text mb-4">
                {t('archive.intro.title')}
              </h2>
              <p className="leading-relaxed">
                {t('archive.intro.text')}
              </p>
            </div>
            <div className="aspect-[4/3] bg-gray-100" />
          </div>
        </section>

        {/* Contribute Form */}
        <section className="mb-20 max-w-2xl">
          <h2 className="eatable-text mb-6">
            {t('archive.contribute.title')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 border border-black p-8">
            <div>
              <label className="block mb-2">
                {t('archive.contribute.name')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-black px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2">
                {t('archive.contribute.description')}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-black px-4 py-2 min-h-32"
                required
              />
            </div>

            <div>
              <label className="block mb-2">
                {t('archive.contribute.file')}
              </label>
              <input
                type="file"
                className="w-full border border-black px-4 py-2"
                required
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1"
                required
              />
              <label>
                {t('archive.contribute.consent')}
              </label>
            </div>

            <button
              type="submit"
              className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
            >
              {t('archive.contribute.submit')}
            </button>
          </form>
        </section>

        {/* Exhibition Production */}
        <section>
          <h2 className="eatable-text mb-8">
            {t('archive.exhibition.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {exhibitions.map((exhibition, index) => (
              <div key={index} className="border border-black p-6">
                <div className="aspect-[16/10] bg-gray-100 mb-4" />
                <div className="flex items-baseline justify-between mb-3">
                  <h3>
                    {language === 'en' ? exhibition.titleEn : exhibition.titleAr}
                  </h3>
                  <span className="text-sm">{exhibition.year}</span>
                </div>
                <p>
                  {language === 'en' ? exhibition.descriptionEn : exhibition.descriptionAr}
>>>>>>> 1834f666793186ec6873134da49b3b6df728ebda
                </p>
              </div>
            )}

            {!loading && !error && articles && articles.length === 0 && (
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
<<<<<<< HEAD
        </div>
      </section>
=======
        </section>
      </div>
>>>>>>> 1834f666793186ec6873134da49b3b6df728ebda
    </div>
  );
}
