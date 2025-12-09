import { useLanguage } from '../contexts/LanguageContext';
import { SnakeGameFull } from '../components/SnakeGameFull';

type ArchiveCopy = {
  kicker: string;
  title: string;
  intro: string;
  note: string;
  consoleHeading: string;
  consoleLead: string;
};

const archiveCopy: Record<'en' | 'ar', ArchiveCopy> = {
  en: {
    kicker: 'Archive',
    title: 'Archive coming soon',
    intro:
      'We are reorganising the Merath collection so the public ledger can reopen with accurate bilingual search and refreshed shelving.',
    note: 'Thank you for your patience while we steady the catalogue.',
    consoleHeading: 'Snake caretaker console',
    consoleLead: 'Keep the sensors awake while we finish the archive shelving.',
  },
  ar: {
    kicker: 'الأرشيف',
    title: 'الأرشيف قريباً',
    intro:
      'نعيد ترتيب مجموعة ميراث كي نعيد فتح السجل العام بدقة وبحث ثنائي اللغة ورفوف مستقرة.',
    note: 'شكراً لصبركم بينما نُحكّم الفهرس.',
    consoleHeading: 'لوحة الثعبان',
    consoleLead: 'أبقِ الحساسات يقظة بينما نُعيد ترتيب الأرشيف.',
  },
};

export function Projects() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const copy = archiveCopy[isArabic ? 'ar' : 'en'];

  return (
    <div className="archive-page" dir={isArabic ? 'rtl' : 'ltr'}>
      <section className="archive-hero-simple room room--hero" aria-labelledby="archive-heading">
        <div className="archive-hero-simple__card archive-hero-simple__card--dual" role="region" aria-labelledby="archive-heading">
          <div className="archive-hero-simple__copy">
            <p className="room__kicker">{copy.kicker}</p>
            <h1 id="archive-heading">{copy.title}</h1>
            <p className="archive-hero-simple__intro">{copy.intro}</p>
            <p className="archive-hero-simple__note">{copy.note}</p>
          </div>
          <div className="archive-hero-simple__inline-game" aria-label={copy.consoleLead}>
            <p className="archive-console-simple__eyebrow">{copy.consoleHeading}</p>
            <h2>{copy.consoleLead}</h2>
            <div className="archive-console-simple__game">
              <SnakeGameFull locale={isArabic ? 'ar' : 'en'} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
