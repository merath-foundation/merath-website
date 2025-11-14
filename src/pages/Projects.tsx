import { PageTransition } from '../components/PageTransition';
import { ProjectCard } from '../components/ProjectCard';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';

export function Projects() {
  const { t, language } = useLanguage();

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-[1400px] mx-auto">
        <h1 className="mb-16">
          {t('projects.title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title[language]}
              type={project.type[language]}
              year={project.year}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
