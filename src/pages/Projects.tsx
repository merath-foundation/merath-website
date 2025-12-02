import { useLanguage } from '../contexts/LanguageContext';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export function Projects() {
  const { language } = useLanguage();

  return (
    <div className="projects-page">
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4">Projects</h1>
            <div className="w-16 h-0.5 bg-black/20"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title[language]}
                category={project.type[language]}
                year={project.year}
                image={project.image}
                summary={project.overview[language]}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
