import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useLivingArchive } from '../contexts/LivingArchiveContext';

type Locale = 'en' | 'ar';

type ArchiveRoom = {
  id: string;
  label: Record<Locale, string>;
  description: Record<Locale, string>;
};

type ArchiveRecord = {
  id: string;
  room: string;
  projectId: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  medium: Record<Locale, string>;
  location: Record<Locale, string>;
  contributor: Record<Locale, string>;
  status: Record<Locale, string>;
  year: string;
};

const ARCHIVE_ROOMS: ArchiveRoom[] = [
  {
    id: 'foundation',
    label: {
      en: 'Foundation',
      ar: 'المؤسسة',
    },
    description: {
      en: 'Institutional policies, governance briefs, and stewardship frameworks.',
      ar: 'سياسات مؤسسية، مذكرات الحوكمة، وأطر الوصاية.',
    },
  },
  {
    id: 'livingArchive',
    label: {
      en: 'Living Archive',
      ar: 'الأرشيف الحي',
    },
    description: {
      en: 'Indexed records of field notes, transcripts, and material culture.',
      ar: 'سجلات مفهرسة للملاحظات الميدانية والنصوص والمواد الثقافية.',
    },
  },
  {
    id: 'projectsLedger',
    label: {
      en: 'Projects Ledger',
      ar: 'دفتر المشاريع',
    },
    description: {
      en: 'Active commissions, production updates, and residency outputs.',
      ar: 'التكليفات النشطة وتحديثات الإنتاج ومخرجات الإقامات.',
    },
  },
  {
    id: 'preservationNetwork',
    label: {
      en: 'Preservation Network',
      ar: 'شبكة الحفظ',
    },
    description: {
      en: 'Regional partnerships, storage agreements, and digitisation reports.',
      ar: 'شراكات إقليمية، اتفاقيات التخزين، وتقارير الرقمنة.',
    },
  },
  {
    id: 'signals',
    label: {
      en: 'Signals',
      ar: 'التراسل',
    },
    description: {
      en: 'Open calls, partnership briefs, and invitations to collaborate.',
      ar: 'دعوات مفتوحة ومذكرات الشراكة ودعوات التعاون.',
    },
  },
];

const ARCHIVE_RECORDS: ArchiveRecord[] = [
  {
    id: 'record-stewardship-brief',
    room: 'foundation',
    projectId: 'urban-memory',
    title: {
      en: 'Urban Memory Stewardship Brief',
      ar: 'مذكرة رعاية الذاكرة الحضرية',
    },
    summary: {
      en: 'Defines the criteria for safeguarding resident-led archives and the review schedule with municipal partners.',
      ar: 'تحدد المعايير اللازمة لحماية الأرشيفات التي يقودها السكان وجدول المراجعة مع الشركاء البلديين.',
    },
    medium: {
      en: 'Policy note',
      ar: 'مذكرة سياسات',
    },
    location: {
      en: 'Beirut, Lebanon',
      ar: 'بيروت، لبنان',
    },
    contributor: {
      en: 'Merath governance unit',
      ar: 'فريق حوكمة ميراث',
    },
    status: {
      en: 'Catalogued',
      ar: 'مفهرس',
    },
    year: '2024',
  },
  {
    id: 'record-transit-audio',
    room: 'livingArchive',
    projectId: 'oral-histories',
    title: {
      en: 'Transit Oral Recordings',
      ar: 'تسجيلات النقل الشفوية',
    },
    summary: {
      en: 'Annotated transcripts from the coastal transit study with timecodes for every interview segment.',
      ar: 'نصوص مشروحة من دراسة النقل الساحلي مع طوابع زمنية لكل مقطع مقابلة.',
    },
    medium: {
      en: 'Audio transcripts',
      ar: 'نصوص صوتية',
    },
    location: {
      en: 'Byblos & Saida, Lebanon',
      ar: 'جبيل وصيدا، لبنان',
    },
    contributor: {
      en: 'Community oral history team',
      ar: 'فريق التاريخ الشفوي المجتمعي',
    },
    status: {
      en: 'Digitised',
      ar: 'مُرقمن',
    },
    year: '2023',
  },
  {
    id: 'record-textile-atlas',
    room: 'projectsLedger',
    projectId: 'textile-traditions',
    title: {
      en: 'Textile Pattern Atlas Proofs',
      ar: 'بروفات أطلس أنماط النسيج',
    },
    summary: {
      en: 'Proof set of textile diagrams linking residencies in Tripoli, Amman, and Alexandria to the mentorship programme.',
      ar: 'مجموعة بروفات لرسومات النسيج تربط الإقامات في طرابلس وعمان والإسكندرية ببرنامج الإرشاد.',
    },
    medium: {
      en: 'Print-ready folio',
      ar: 'ملف جاهز للطباعة',
    },
    location: {
      en: 'Tripoli, Lebanon',
      ar: 'طرابلس، لبنان',
    },
    contributor: {
      en: 'Residency cohort 2022',
      ar: 'دفعة الإقامات 2022',
    },
    status: {
      en: 'In layout',
      ar: 'قيد الإخراج',
    },
    year: '2022',
  },
  {
    id: 'record-preservation-accord',
    room: 'preservationNetwork',
    projectId: 'landscape-memory',
    title: {
      en: 'Co-preservation Accord Draft',
      ar: 'مسودة اتفاقية الحفظ المشترك',
    },
    summary: {
      en: 'Draft agreement outlining shared storage, checksum protocols, and training calendar with three municipalities.',
      ar: 'مسودة اتفاقية تحدد التخزين المشترك وبروتوكولات التحقق وجدول التدريب مع ثلاث بلديات.',
    },
    medium: {
      en: 'Agreement draft',
      ar: 'مسودة اتفاقية',
    },
    location: {
      en: 'Tripoli, Sidon, Tyre',
      ar: 'طرابلس وصيدا وصور',
    },
    contributor: {
      en: 'Municipal preservation network',
      ar: 'شبكة الحفظ البلدية',
    },
    status: {
      en: 'Under review',
      ar: 'قيد المراجعة',
    },
    year: '2024',
  },
  {
    id: 'record-signals-dossier',
    room: 'signals',
    projectId: 'migration-narratives',
    title: {
      en: 'Residency Exchange Dossier',
      ar: 'ملف تبادل الإقامات',
    },
    summary: {
      en: 'Briefing kit for partner institutions outlining eligibility, timelines, and required documentation for exchange residents.',
      ar: 'ملف إرشادي للمؤسسات الشريكة يوضح الأهلية والجداول الزمنية والوثائق المطلوبة لإقامات التبادل.',
    },
    medium: {
      en: 'Application dossier',
      ar: 'ملف طلب',
    },
    location: {
      en: 'Regional network',
      ar: 'شبكة إقليمية',
    },
    contributor: {
      en: 'Residency desk',
      ar: 'مكتب الإقامات',
    },
    status: {
      en: 'Published',
      ar: 'منشور',
    },
    year: '2025',
  },
];

const MAILTO_BASE = 'hello@merath.org';

export function LogoSnakeExperience() {
  const { language } = useLanguage();
  const locale: Locale = language === 'ar' ? 'ar' : 'en';
  const { reportState } = useLivingArchive();
  const [activeRoom, setActiveRoom] = useState<string>('all');
  const [selectedRecordId, setSelectedRecordId] = useState<string>(ARCHIVE_RECORDS[0]?.id ?? '');

  const roomsMap = useMemo(() => {
    return new Map(ARCHIVE_ROOMS.map(room => [room.id, room]));
  }, []);

  const filteredRecords = useMemo(() => {
    if (activeRoom === 'all') return ARCHIVE_RECORDS;
    return ARCHIVE_RECORDS.filter(record => record.room === activeRoom);
  }, [activeRoom]);

  useEffect(() => {
    if (!filteredRecords.length) {
      return;
    }

    const selectedStillVisible = filteredRecords.some(record => record.id === selectedRecordId);
    if (!selectedStillVisible) {
      setSelectedRecordId(filteredRecords[0].id);
    }
  }, [filteredRecords, selectedRecordId]);

  const selectedRecord = useMemo(() => {
    if (filteredRecords.length === 0) return ARCHIVE_RECORDS[0] ?? null;
    return filteredRecords.find(record => record.id === selectedRecordId) ?? filteredRecords[0];
  }, [filteredRecords, selectedRecordId]);

  useEffect(() => {
    reportState({
      promptLabel: selectedRecord ? selectedRecord.summary[locale] : null,
      projectId: selectedRecord?.projectId ?? null,
      collectedCount: filteredRecords.length,
      totalCount: ARCHIVE_RECORDS.length,
      status: 'active',
      tempo: 'active',
    });
  }, [reportState, selectedRecord, filteredRecords.length, locale]);

  const helperCopy = locale === 'ar'
    ? 'حدّد غرفة لعرض السجلات المرتبطة بها؛ استخدم مفاتيح Tab والأسهم للانتقال بين الإدخالات ثم افتح التفاصيل لقراءة الملخص.'
    : 'Select a room to surface related records; use Tab or arrow keys to move through entries, then open the detail panel for the abstract.';

  const listLabel = locale === 'ar'
    ? 'قائمة سجلات الأرشيف'
    : 'Archive record list';

  const detailHeading = locale === 'ar'
    ? 'تفاصيل السجل'
    : 'Record detail';

  const roomLabel = locale === 'ar' ? 'الغرف' : 'Rooms';
  const allRoomsLabel = locale === 'ar' ? 'كل الغرف' : 'All rooms';
  const locationLabel = locale === 'ar' ? 'الموقع' : 'Location';
  const mediumLabel = locale === 'ar' ? 'الوسيط' : 'Medium';
  const contributorLabel = locale === 'ar' ? 'المساهم' : 'Contributor';
  const yearLabel = locale === 'ar' ? 'السنة' : 'Year';
  const statusLabel = locale === 'ar' ? 'الحالة' : 'Status';
  const relatedProjectLabel = locale === 'ar' ? 'عرض المشروع المرتبط' : 'View related project';
  const requestAccessLabel = locale === 'ar' ? 'طلب الوصول إلى السجل' : 'Request access to record';
  const helperTitle = locale === 'ar' ? 'إرشاد الأرشيف' : 'Archive guidance';
  const statsLabel = locale === 'ar' ? 'السجلات في هذا العرض' : 'Records in this view';

  const selectedRoom = selectedRecord ? roomsMap.get(selectedRecord.room) : undefined;

  const accessLink = selectedRecord
    ? `mailto:${MAILTO_BASE}?subject=${encodeURIComponent(locale === 'ar'
      ? `طلب وصول إلى السجل – ${selectedRecord.title[locale]}`
      : `Archive access request – ${selectedRecord.title[locale]}`)}`
    : `mailto:${MAILTO_BASE}`;

  return (
    <section className="logo-maze archive-index" aria-label={locale === 'ar' ? 'فهرس الأرشيف المؤسسي' : 'Institutional archive index'}>
      <div className="archive-index__header">
        <div>
          <p className="room__kicker">{locale === 'ar' ? 'الفهرس' : 'Index'}</p>
          <h3>
            {locale === 'ar'
              ? 'سجلات حية مرتبة كسلسلة بحثية'
              : 'Living records presented as a research series'}
          </h3>
          <p>
            {locale === 'ar'
              ? 'استخدم الفهرس لمراجعة الملخصات، متابعة الشركاء، واستدعاء المواد اللازمة لأي برنامج أو إقامة.'
              : 'Use the index to review abstracts, follow partners, and call up materials relevant to any programme or residency.'}
          </p>
        </div>
        <div className="archive-index__status">
          <span>{statsLabel}</span>
          <strong>{filteredRecords.length}</strong>
          <p>
            {locale === 'ar'
              ? `${ARCHIVE_RECORDS.length} سجل متاح في المجموع`
              : `${ARCHIVE_RECORDS.length} records catalogued overall`}
          </p>
        </div>
      </div>

      <div className="archive-index__filters" aria-label={roomLabel} role="navigation">
        <span>{roomLabel}</span>
        <div className="archive-index__filter-buttons">
          <button
            type="button"
            onClick={() => setActiveRoom('all')}
            className={`archive-index__filter ${activeRoom === 'all' ? 'is-active' : ''}`}
          >
            {allRoomsLabel}
          </button>
          {ARCHIVE_ROOMS.map(room => (
            <button
              key={room.id}
              type="button"
              onClick={() => setActiveRoom(room.id)}
              className={`archive-index__filter ${activeRoom === room.id ? 'is-active' : ''}`}
              aria-pressed={activeRoom === room.id}
            >
              {room.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="archive-index__layout">
        <div
          className="archive-index__list"
          role="listbox"
          aria-label={listLabel}
          tabIndex={0}
        >
          {filteredRecords.map(record => {
            const room = roomsMap.get(record.room);
            const isSelected = selectedRecord && record.id === selectedRecord.id;
            return (
              <button
                type="button"
                key={record.id}
                role="option"
                aria-selected={isSelected}
                className={`archive-index__record ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedRecordId(record.id)}
              >
                <div>
                  <p className="archive-index__record-room">{room?.label[locale] ?? ''}</p>
                  <p className="archive-index__record-title">{record.title[locale]}</p>
                  <p className="archive-index__record-meta">{record.year} · {record.medium[locale]}</p>
                </div>
                <span className="archive-index__record-status">{record.status[locale]}</span>
              </button>
            );
          })}
        </div>

        <div className="archive-index__detail" aria-live="polite">
          {selectedRecord ? (
            <>
              <p className="archive-index__detail-kicker">{selectedRoom?.label[locale]}</p>
              <h4>{selectedRecord.title[locale]}</h4>
              <p className="archive-index__detail-summary">{selectedRecord.summary[locale]}</p>
              <dl>
                <div>
                  <dt>{locationLabel}</dt>
                  <dd>{selectedRecord.location[locale]}</dd>
                </div>
                <div>
                  <dt>{mediumLabel}</dt>
                  <dd>{selectedRecord.medium[locale]}</dd>
                </div>
                <div>
                  <dt>{contributorLabel}</dt>
                  <dd>{selectedRecord.contributor[locale]}</dd>
                </div>
                <div>
                  <dt>{yearLabel}</dt>
                  <dd>{selectedRecord.year}</dd>
                </div>
                <div>
                  <dt>{statusLabel}</dt>
                  <dd>{selectedRecord.status[locale]}</dd>
                </div>
              </dl>
              <div className="archive-index__actions">
                <Link
                  to={`/projects/${selectedRecord.projectId}`}
                  className="archive-index__action-link"
                >
                  {relatedProjectLabel}
                </Link>
                <a
                  href={accessLink}
                  className="archive-index__action-link archive-index__action-link--ghost"
                >
                  {requestAccessLabel}
                </a>
              </div>
            </>
          ) : (
            <div className="archive-index__empty">
              <p>{detailHeading}</p>
            </div>
          )}
        </div>
      </div>

      <div className="archive-index__helper">
        <span>{helperTitle}</span>
        <p>{helperCopy}</p>
      </div>
    </section>
  );
}
