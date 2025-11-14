import { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Archive() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    story: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert(language === 'en' ? 'Thank you for your contribution!' : 'شكراً لمساهمتك!');
    setFormData({ name: '', email: '', story: '' });
  };

  const caseStudies = [
    {
      title: {
        en: 'Voices of Displacement Exhibition',
        ar: 'معرض أصوات النزوح'
      },
      year: '2023',
      description: {
        en: 'A collaborative exhibition featuring 40 personal narratives of displacement, created in partnership with refugee communities. The exhibition traveled to six cities and was viewed by over 15,000 visitors.',
        ar: 'معرض تعاوني يضم 40 رواية شخصية عن النزوح، تم إنشاؤه بالشراكة مع مجتمعات اللاجئين. سافر المعرض إلى ست مدن وشاهده أكثر من 15000 زائر.'
      },
      image: 'https://images.unsplash.com/photo-1713700743037-ebc94696d157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXZlJTIwZG9jdW1lbnRzJTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NjMwNzI0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: {
        en: 'Living Heritage: Craft Traditions',
        ar: 'التراث الحي: تقاليد الحرف'
      },
      year: '2022',
      description: {
        en: 'An immersive exhibition showcasing traditional crafts through video documentation, artifacts, and live demonstrations. Visitors engaged with master artisans and participated in workshops.',
        ar: 'معرض غامر يعرض الحرف التقليدية من خلال التوثيق بالفيديو والقطع الأثرية والعروض الحية. تفاعل الزوار مع الحرفيين الخبراء وشاركوا في ورش العمل.'
      },
      image: 'https://images.unsplash.com/photo-1622701893201-9bc9eb616690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNyYWZ0JTIwaGFuZHN8ZW58MXx8fHwxNjMwMDA2OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: {
        en: 'Urban Memories Digital Archive',
        ar: 'الأرشيف الرقمي للذكريات الحضرية'
      },
      year: '2021',
      description: {
        en: 'An online platform presenting digitized photographs, maps, and oral histories documenting neighborhood transformations. The archive includes interactive timelines and community-contributed content.',
        ar: 'منصة إلكترونية تقدم صوراً ممسوحة ضوئياً وخرائط وتواريخ شفوية توثق تحولات الأحياء. يتضمن الأرشيف جداول زمنية تفاعلية ومحتوى مساهم من المجتمع.'
      },
      image: 'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGNlbnRlciUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjMwNzI0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-[1400px] mx-auto">
        <h1 className="mb-16">
          {t('archive.title')}
        </h1>

        {/* Two-column intro */}
        <div className="mb-24">
          <h2 className="mb-12">
            {t('archive.intro.title')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <p className="leading-relaxed text-neutral-700">
              {t('archive.intro.left')}
            </p>
            <p className="leading-relaxed text-neutral-700">
              {t('archive.intro.right')}
            </p>
          </div>
        </div>

        {/* Contribute form */}
        <div className="mb-24 border border-neutral-200 p-12 bg-neutral-50">
          <h2 className="mb-4">
            {t('archive.contribute.title')}
          </h2>
          <p className="mb-8 text-neutral-600 leading-relaxed">
            {t('archive.contribute.description')}
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder={t('archive.form.name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder={t('archive.form.email')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full"
              />
            </div>
            <div>
              <Textarea
                placeholder={t('archive.form.story')}
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                required
                rows={6}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full lg:w-auto">
              {t('archive.form.submit')}
            </Button>
          </form>
        </div>

        {/* Case studies */}
        <div>
          <h2 className="mb-12">
            {t('archive.cases.title')}
          </h2>
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="aspect-[4/3] bg-neutral-100">
                    <ImageWithFallback
                      src={study.image}
                      alt={study.title[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="text-sm text-neutral-500 mb-2">{study.year}</p>
                  <h3 className="mb-4">
                    {study.title[language]}
                  </h3>
                  <p className="leading-relaxed text-neutral-700">
                    {study.description[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
