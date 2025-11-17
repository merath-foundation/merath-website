import { useState } from 'react';
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
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
