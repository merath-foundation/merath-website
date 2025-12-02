import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-light text-black mb-4">Project not found</h1>
          <Link to="/projects" className="text-black/60 hover:text-black">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Back Link */}
      <div className="py-6 px-6 border-b border-black/10 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link to="/projects" className="text-sm text-black/60 hover:text-black transition-colors">
            ← Back to Projects
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      {project.image && (
        <div className="aspect-[16/9] bg-neutral-100">
          <img
            src={project.image}
            alt={project.title[language]}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title & Metadata */}
          <div className="mb-16">
            <div className="flex items-center gap-2 text-xs text-black/40 uppercase tracking-wide mb-4">
              <span>{project.type[language]}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black">
              {project.title[language]}
            </h1>
          </div>

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-light text-black mb-4">Overview</h2>
              <p className="text-black/70 leading-relaxed">{project.overview[language]}</p>
            </div>

            {/* Methods */}
            <div>
              <h2 className="text-2xl font-light text-black mb-4">Methods</h2>
              <p className="text-black/70 leading-relaxed">{project.approach[language]}</p>
            </div>

            {/* Outcomes */}
            <div>
              <h2 className="text-2xl font-light text-black mb-4">Outcomes</h2>
              <p className="text-black/70 leading-relaxed">{project.outcomes[language]}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
