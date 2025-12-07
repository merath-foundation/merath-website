import { Link } from 'react-router-dom';
import { HandwrittenText } from '../../../components/HandwrittenText';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useRoomAnchor } from '../../../contexts/RoomsContext';

const foundationTracks = [
  {
    key: 'programs',
    en: {
      label: 'Programs',
      title: 'Programs & research forums',
      body: 'Public dialogues, city notebooks, and field classrooms share working methods and keep questions of urban stewardship public.',
      meta: 'Public dialogues · City notebooks',
    },
    ar: {
      label: 'البرامج',
      title: 'البرامج والمنتديات البحثية',
      body: 'تنقل الحوارات ودفاتر المدينة والمعامل الميدانية أساليب العمل وتُبقي أسئلة الوصاية على الذاكرة الحضرية في المتناول العام.',
      meta: 'حوارات عامة · دفاتر المدينة',
    },
  },
  {
    key: 'residencies',
    en: {
      label: 'Residencies',
      title: 'Residencies & studio support',
      body: 'On-site and remote residencies provide stipends, mentorship, and production resources for practitioners caring for community-held archives.',
      meta: '3–6 months · Beirut & remote',
    },
    ar: {
      label: 'الإقامات',
      title: 'الإقامات ودعم الاستوديو',
      body: 'توفّر الإقامات الحضورية وعن بُعد بدلات إنتاج، وإرشاداً تقييمياً، وموارد تشغيل للممارسين الذين يعتنون بالأرشيفات المجتمعية.',
      meta: '٣–٦ أشهر · بيروت وعبر الإنترنت',
    },
  },
  {
    key: 'partnerships',
    en: {
      label: 'Partnerships',
      title: 'Partnerships & civic alliances',
      body: 'We co-design preservation protocols with municipalities, universities, and neighborhood groups so records remain accessible where they originate.',
      meta: 'Municipal archives · Civic labs',
    },
    ar: {
      label: 'الشراكات',
      title: 'الشراكات والتحالفات المدنية',
      body: 'نصمم بروتوكولات الحفظ مع البلديات والجامعات والمجموعات الأهلية كي تبقى السجلات متاحة حيث نشأت.',
      meta: 'أرشيفات بلدية · مختبرات مدنية',
    },
  },
];

export function FoundationRoom() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const roomRef = useRoomAnchor('foundation');

  const missionCopy = isArabic
    ? 'تدعم مؤسسة ميراث الفنانين والباحثين وحماة المدن في بيروت والمنطقة لتوثيق الذاكرة الحضرية وتفعيلها عبر الإقامات والبرامج العامة والأرشيف الحي.'
    : 'Merath Cultural Foundation supports artists, researchers, and civic stewards in Beirut and across the region to document, interpret, and activate urban memory through residencies, public programs, and a living archive.';

  return (
    <section ref={roomRef} id="room-foundation" className="room room--hero foundation-room" aria-labelledby="foundation-title">
      <div className="foundation-room__hero">
        <div>
          <p className="foundation-room__label">{isArabic ? 'المؤسسة' : 'Foundation'}</p>
          <h1 className="foundation-room__title" id="foundation-title">
            <HandwrittenText
              text={isArabic ? 'حفظ الذاكرة الثقافية' : 'Preserving cultural memory'}
              delay={0.25}
            />
          </h1>
          <p className="foundation-room__lede">{missionCopy}</p>
          <div className="foundation-room__actions">
            <Link to="/projects" className="btn btn-primary foundation-room__action--primary">
              {isArabic ? 'استكشف البرامج' : 'Explore programs'}
            </Link>
            <Link to="/about" className="btn btn-ghost">
              {isArabic ? 'اقرأ عن الحوكمة' : 'Review governance'}
            </Link>
          </div>
        </div>
      </div>

      <div className="foundation-room__pillars" aria-label={isArabic ? 'مبادئ المؤسسة' : 'Foundation pillars'}>
        {foundationTracks.map((track, index) => (
          <article key={track.key} className="foundation-room__pillar">
            <span className="foundation-room__pillar-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className="room__kicker">{track[language as 'en' | 'ar'].label}</p>
              <h3>{track[language as 'en' | 'ar'].title}</h3>
              <p>{track[language as 'en' | 'ar'].body}</p>
              <p className="foundation-room__pillar-meta">{track[language as 'en' | 'ar'].meta}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
