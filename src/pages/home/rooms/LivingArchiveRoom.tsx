import { useRef } from 'react';
import { LogoSnakeExperience } from '../../../components/LogoSnakeExperience';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useLivingArchive } from '../../../contexts/LivingArchiveContext';
import { useRoomAnchor } from '../../../contexts/RoomsContext';

const archiveNotes = [
  {
    key: 'notes-01',
    en: 'Entries are organised by rooms so research threads, residencies, and public notes remain legible as one body of work.',
    ar: 'تُنظّم الإدخالات بحسب الغرف كي تبقى مسارات البحث والإقامات والملاحظات العامة مقروءة كجسد واحد من العمل.',
  },
  {
    key: 'notes-02',
    en: 'Each record includes contributors, medium, and conditions for requesting access to high-resolution files.',
    ar: 'يتضمن كل سجل أسماء المساهمين، ونوع الوسيط، وشروط طلب الوصول إلى الملفات عالية الدقة.',
  },
  {
    key: 'notes-03',
    en: 'Monthly additions are timestamped and cross-linked to programmes, residencies, and civic partnerships.',
    ar: 'تُؤرّخ الإضافات الشهرية وتُربط بالبرامج والإقامات والشراكات المدنية.',
  },
];

export function LivingArchiveRoom() {
  const { language } = useLanguage();
  const roomRef = useRoomAnchor('livingArchive');
  const isArabic = language === 'ar';
  const { collectedCount, totalCount, promptLabel } = useLivingArchive();
  const interactiveRef = useRef<HTMLDivElement>(null);
  const promptCopy = promptLabel ?? (isArabic
    ? 'اختر سجلاً لقراءة ملخصه والوصول إلى تفاصيل الترخيص.'
    : 'Select a record to read its abstract and access conditions.');
  const startLabel = isArabic ? 'تصفح الفهرس' : 'Browse the index';
  const statusLabel = isArabic ? 'حالة الأرشيف' : 'Archive status';
  const focusLabel = isArabic ? 'سجلات في التركيز' : 'Records in focus';
  const totalLabel = isArabic ? 'سجلات مفهرسة' : 'Catalogued entries';
  const controlsLabel = isArabic ? 'إرشادات الاستخدام' : 'Access guidance';
  const helperCopy = isArabic
    ? 'استخدم أدوات الفلترة لعرض السجلات بحسب الغرفة، الوسيط، أو المساهم. جميع الأزرار قابلة للوصول عبر لوحة المفاتيح.'
    : 'Use the filters to view records by room, medium, or contributor. Every control is keyboard accessible.';
  const promptTitleCopy = isArabic ? 'السجل المميز' : 'Highlighted entry';
  const controlChips = isArabic
    ? ['فلترة حسب الغرفة', 'ترتيب حسب الوسيط', 'طلب ملف عالي الدقة']
    : ['Filter by room', 'Sort by medium', 'Request high-res file'];
  const handleExplore = () => {
    interactiveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section ref={roomRef} id="room-living-archive" className="room room--archive living-archive-room" aria-labelledby="living-archive-title">
      <div className="living-archive-room__panel">
        <div className="living-archive-room__text">
          <p className="room__kicker">{isArabic ? 'واجهة الأرشيف الحي' : 'Living archive interface'}</p>
          <h2 className="room__subtitle" id="living-archive-title">
            {isArabic
              ? 'فهرس هادئ يربط الذاكرة الحضرية بغرف البرامج والإقامات'
              : 'A quiet index linking urban memory to programme and residency rooms'}
          </h2>
          <p className="room__copy">
            {isArabic
              ? 'تعرض الواجهة سجلات الأرشيف الحي كقائمة بحثية واضحة يمكن فرزها حسب الغرفة أو نوع الوسيط أو المدينة.'
              : 'The interface presents the living archive as a legible research list that can be filtered by room, medium, or city.'}
          </p>
          <p className="room__copy">
            {isArabic
              ? 'اللغة مؤسسية وواضحة: موجز لكل سجل، روابط للمشاريع المرتبطة، وأزرار مباشرة لطلب الملفات أو مراسلة الفريق.'
              : 'Its tone is institutional and clear: a brief for every record, links to related programmes, and direct actions to request files or contact the team.'}
          </p>
          <ul className="room__note-list">
            {archiveNotes.map(note => (
              <li key={note.key}>{note[language as 'en' | 'ar']}</li>
            ))}
          </ul>
        </div>

        <div className="living-archive-room__controls" aria-live="polite">
          <div className="living-archive-room__progress">
            <p className="living-archive-room__progress-label">{statusLabel}</p>
            <div className="living-archive-room__status-row">
              <div>
                <strong>{collectedCount}</strong>
                <span>{focusLabel}</span>
              </div>
              <div>
                <strong>{totalCount}</strong>
                <span>{totalLabel}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary living-archive-room__start"
            onClick={handleExplore}
            aria-controls="living-archive-experience"
          >
            {startLabel}
          </button>
          <div className="living-archive-room__prompt">
            <span className="living-archive-room__prompt-label">{promptTitleCopy}</span>
            <p>{promptCopy}</p>
          </div>
          <div className="living-archive-room__controls-panel">
            <p className="living-archive-room__controls-label">{controlsLabel}</p>
            <p className="living-archive-room__helper">{helperCopy}</p>
            <div className="living-archive-room__chips">
              {controlChips.map(chip => (
                <span key={chip} className="living-archive-room__chip">{chip}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={interactiveRef} id="living-archive-experience" className="living-archive-room__experience" aria-label={isArabic ? 'استعراض فهرس الأرشيف الحي' : 'Living archive index view'}>
        <LogoSnakeExperience />
      </div>
    </section>
  );
}
