import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useSanity } from '../hooks/useSanity';
import { urlFor } from '../lib/sanity';
import { LoadingSkeletons } from '../components/LoadingSkeletons';

interface Project {
  _id: string;
  slug: { current: string };
  title: { en: string; ar: string };
  year?: string;
  description?: { en: string; ar: string };
  featuredImage?: any;
  publishedAt?: string;
}

export function Projects() {
  const { language, t } = useLanguage();
  const { data: projects, loading, error } = useSanity<Project[]>(
    `*[_type == "project"] | order(publishedAt desc)`
  );

  const isArabic = language === 'ar';
  const introCopy = isArabic
    ? 'مختبر مفتوح للتكليفات الطويلة، حيث تقاس المشاريع بعمق الشراكة لا بمدة العرض.'
    : 'An open lab of long-form commissions, measured by depth of partnership rather than duration of display.';

  const renderLedger = () => {
    if (loading) {
      return <LoadingSkeletons count={3} />;
    }

    if (error) {
      return (
        <p className="room__copy">
          {isArabic ? 'تعذر تحميل المشاريع حالياً.' : 'Unable to load projects right now.'}
        </p>
      );
    }

    if (!projects || projects.length === 0) {
      return (
        <p className="room__copy">
          {isArabic ? 'لا توجد مشاريع متاحة بعد.' : 'No projects available yet.'}
        </p>
      );
    }

    return (
      <ol className="project-inventory" aria-label={isArabic ? 'قائمة المشاريع' : 'Project inventory'}>
        {projects.map((project, index) => (
          <li key={project._id}>
            <span className="project-inventory__index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className="project-inventory__title">
                {language === 'en' ? project.title.en : project.title.ar}
              </p>
              <div className="project-inventory__meta">
                <span>{project.year}</span>
                <span>•</span>
                <span>{project.description ? (language === 'en' ? project.description.en : project.description.ar) : ''}</span>
              </div>
            </div>
            <Link to={`/projects/${project.slug.current}`} aria-label={language === 'en' ? `Visit ${project.title.en}` : `عرض ${project.title.ar}`}>
              ↗
            </Link>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="home-page">
      <section className="room room--projects room--hero">
        <div className="room__grid room__grid--ledger">
          <div className="room__column room__column--stack">
            <p className="room__kicker">{language === 'en' ? 'Projects' : 'المشاريع'}</p>
            <h1 className="room__subtitle">{t('projects.title')}</h1>
            <p className="room__copy">{introCopy}</p>
          </div>
          <div className="room__column room__column--stack">
            <p className="room__note">
              {isArabic
                ? 'كل إدخال يحمل فريقه الميداني، رعاته، والموقع الذي انطلقت منه البحوث.'
                : 'Each entry carries its field team, patrons, and the sites where research first took root.'}
            </p>
            <p className="room__note">
              {isArabic
                ? 'يمكن زيارة المشاريع النشطة أو المؤرشفة من خلال الروابط المرفقة.'
                : 'Visit living or archived projects via the links, each one opening its own dossier.'}
            </p>
          </div>
        </div>
      </section>

      <section className="room room--projects-ledger">
        {renderLedger()}
      </section>
    </div>
  );
}
