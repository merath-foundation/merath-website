import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const stats = [
  { key: 'years', labelEn: 'Years documenting regional heritage', labelAr: 'سنوات في توثيق التراث المحلي', value: '12+' },
  { key: 'communities', labelEn: 'Communities in long-term partnership', labelAr: 'مجتمعات ضمن شراكات طويلة الأمد', value: '30' },
  { key: 'collections', labelEn: 'Collections preserved & digitised', labelAr: 'مجموعات محفوظة ومُرقمنة', value: '1400+' }
];

const pillars = [
  {
    titleEn: 'Care-led research',
    titleAr: 'بحث قائم على الرعاية',
    bodyEn: 'Collaborative fieldwork, oral history labs, and archivist residencies ensure every narrative is recorded with consent and context.',
    bodyAr: 'يضمن العمل الميداني التعاوني ومختبرات التاريخ الشفهي وإقامات الأمناء توثيق كل رواية بالموافقة والسياق المناسب.'
  },
  {
    titleEn: 'Community exhibitions',
    titleAr: 'معارض مجتمعية',
    bodyEn: 'We co-design immersive shows and publishing programs that make archives legible for local audiences before travelling internationally.',
    bodyAr: 'نصمم مع المجتمعات عروضاً غامرة وبرامج نشر تجعل الأرشيف مفهوماً للجمهور المحلي قبل عرضه عالمياً.'
  },
  {
    titleEn: 'Sustainable stewardship',
    titleAr: 'رعاية مستدامة',
    bodyEn: 'Open tooling, multilingual metadata, and skill sharing keep knowledge in the region and accessible to future generations.',
    bodyAr: 'تضمن الأدوات المفتوحة والبيانات الوصفية المتعددة اللغات وتبادل المهارات بقاء المعرفة في المنطقة وإتاحتها للأجيال القادمة.'
  }
];

const focusAreas = [
  {
    titleEn: 'Oral Knowledge',
    titleAr: 'المعرفة الشفوية',
    copyEn: 'Training recordists to preserve dialects, songs, and testimonies from elders and culture bearers.',
    copyAr: 'تدريب الموثقين على حفظ اللهجات والأغاني والشهادات من كبار السن وحماة الثقافة.'
  },
  {
    titleEn: 'Digital Preservation',
    titleAr: 'الحفظ الرقمي',
    copyEn: 'High-fidelity digitisation pipelines and metadata systems that travel between institutions.',
    copyAr: 'قنوات رقمنة عالية الدقة وأنظمة بيانات وصفية قابلة للتنقل بين المؤسسات.'
  },
  {
    titleEn: 'Exhibition Practice',
    titleAr: 'ممارسات العرض',
    copyEn: 'Producing scenography, publications, and public programmes rooted in community authorship.',
    copyAr: 'إنتاج تصميمات عروض ومنشورات وبرامج عامة منبثقة من تأليف المجتمع.'
  }
];

export function About() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="home-page">
      <section className="px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <p className="hero-label mb-4">
            {language === 'en' ? 'ABOUT' : 'نبذة'}
          </p>
          <motion.h1
            className="hero-title text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {language === 'en'
              ? 'Merath Cultural Foundation'
              : 'مؤسسة ميراث الثقافية'}
          </motion.h1>
          <motion.p
            className="hero-subtitle mt-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {language === 'en'
              ? 'We are an archival studio safeguarding endangered cultural practices through care-led research, community exhibitions, and open knowledge infrastructures.'
              : 'نحن استوديو أرشيفي يحفظ الممارسات الثقافية المهددة من خلال البحث القائم على الرعاية والمعارض المجتمعية وبنى المعرفة المفتوحة.'}
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center md:text-left"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-text-tertiary)] mb-3">
                {isArabic ? stat.labelAr : stat.labelEn}
              </p>
              <p className="text-4xl font-light text-[var(--color-text-primary)]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 bg-[var(--color-background-subtle)]">
        <div className="max-w-5xl mx-auto space-y-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.titleEn}
              className="grid gap-6 md:grid-cols-[240px,1fr] items-start"
            >
              <h3 className="text-2xl font-light text-[var(--color-text-primary)]">
                {isArabic ? pillar.titleAr : pillar.titleEn}
              </h3>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {isArabic ? pillar.bodyAr : pillar.bodyEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[var(--color-text-primary)] m-0">
              {language === 'en' ? 'Areas of focus' : 'مجالات التركيز'}
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl">
              {language === 'en'
                ? 'Field teams across the region maintain living archives that foreground community authorship and shared guardianship.'
                : 'تُدير الفرق الميدانية في المنطقة أرشيفات حية تبرز التأليف المجتمعي والوصاية المشتركة.'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {focusAreas.map((area) => (
              <article
                key={area.titleEn}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
              >
                <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-3">
                  {isArabic ? area.titleAr : area.titleEn}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {isArabic ? area.copyAr : area.copyEn}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-background-elevated)] to-[var(--color-surface)] p-10 text-center">
          <p className="hero-label mb-4 text-center">
            {language === 'en' ? 'COLLABORATION' : 'التعاون'}
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[var(--color-text-primary)] mb-6">
            {language === 'en'
              ? 'We partner with artists, custodians, and public institutions to create archives that remain accessible at home.'
              : 'نتعاون مع الفنانين والقيّمين والمؤسسات العامة لإنشاء أرشيفات تبقى متاحة في موطنها.'}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            {language === 'en'
              ? 'Reach out to begin a residency, share a collection, or commission research.'
              : 'تواصل معنا لبدء إقامة أو مشاركة مجموعة أو تكليف بحث جديد.'}
          </p>
          <a
            href="mailto:info@merath.org"
            className="btn btn-primary"
          >
            info@merath.org
          </a>
        </div>
      </section>
    </div>
  );
}
