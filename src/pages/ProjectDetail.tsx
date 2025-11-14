import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <PageTransition>
        <div className="pt-32 pb-24 px-8 max-w-[1400px] mx-auto">
          <p>Project not found</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-[1400px] mx-auto">
        <Link
          to="/projects"
          className="inline-block mb-12 opacity-60 hover:opacity-100 transition-opacity"
        >
          {t('project.back')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h1 className="mb-4">
              {project.title[language]}
            </h1>
            <p className="text-neutral-600 mb-2">
              {project.type[language]}
            </p>
            <p className="text-neutral-600">
              {project.year}
            </p>
          </div>
          <div className="aspect-[4/3] bg-neutral-100">
            <ImageWithFallback
              src={project.image}
              alt={project.title[language]}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <h3 className="mb-4 text-neutral-500">
              {t('project.overview')}
            </h3>
            <p className="leading-relaxed">
              {project.overview[language]}
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-neutral-500">
              {t('project.approach')}
            </h3>
            <p className="leading-relaxed">
              {project.approach[language]}
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-neutral-500">
              {t('project.outcomes')}
            </h3>
            <p className="leading-relaxed">
              {project.outcomes[language]}
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
