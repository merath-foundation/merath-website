import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../../data/projects';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useLivingArchive } from '../../../contexts/LivingArchiveContext';
import { useRoomAnchor } from '../../../contexts/RoomsContext';

const featuredProjects = projects.slice(0, 6);

export function ProjectsLedgerRoom() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const roomRef = useRoomAnchor('projectsLedger');
  const { projectId, promptLabel } = useLivingArchive();

  const ledgerProjects = useMemo(() => {
    if (!projectId) return featuredProjects;
    const focused = projects.find(project => project.id === projectId);
    if (!focused) return featuredProjects;
    const rest = featuredProjects.filter(project => project.id !== projectId);
    return [focused, ...rest];
  }, [projectId]);

  const archiveReference = promptLabel
    ? (isArabic ? `سجل مختار من الفهرس: ${promptLabel}` : `Record in focus: ${promptLabel}`)
    : (isArabic ? 'استخدم فهرس الأرشيف لاستعراض السجلات المرتبطة بكل مشروع.' : 'Use the archive index to browse records linked to each project.');
  const archiveNote = isArabic
    ? 'يتزامن دفتر المشاريع تلقائيًا مع السجل الذي تختاره داخل واجهة الأرشيف.'
    : 'The ledger synchronises with whichever record you open in the archive interface.';

  return (
    <section ref={roomRef} id="room-projects-ledger" className="room room--projects projects-room" aria-labelledby="projects-ledger-title">
      <div className="projects-room__intro">
        <div>
          <p className="room__kicker">{isArabic ? 'برنامج المشاريع' : 'Projects programme'}</p>
          <h2 className="room__subtitle" id="projects-ledger-title">
            {isArabic ? 'دفتر تكليفات ومخرجات قيد التفعيل' : 'Ledger of commissions and outputs in motion'}
          </h2>
          <p className="room__copy">
            {isArabic
              ? 'يسجّل الدفتر الإقامات، مخططات الإنتاج، وطلبات الأرشيف مع روابط مباشرة لملفات المشاريع والداعمين.'
              : 'The ledger itemises residencies, production plans, and archive requests with direct links to project dossiers and partners.'}
          </p>
        </div>

        <div className="projects-room__status">
          <p className="projects-room__note">{archiveReference}</p>
          <p className="projects-room__progress">{archiveNote}</p>
          <Link to="/projects" className="btn btn-primary projects-room__cta">
            {isArabic ? 'فتح جميع الإدخالات' : 'Open the full ledger'}
          </Link>
        </div>
      </div>

      <ol className="projects-room__list" aria-label={isArabic ? 'دفتر المشاريع' : 'Project ledger'}>
        {ledgerProjects.map((project, index) => {
          const isHighlighted = project.id === projectId;
          return (
            <li key={project.id} className={`projects-room__card ${isHighlighted ? 'projects-room__card--active' : ''}`}>
              <span className="projects-room__card-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="projects-room__card-body">
                <p className="projects-room__card-title">{project.title[language]}</p>
                <p className="projects-room__card-meta">{project.year} · {project.type[language]}</p>
              </div>
              <Link to={`/projects/${project.id}`} aria-label={project.title[language]} className="projects-room__card-link">↗</Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
