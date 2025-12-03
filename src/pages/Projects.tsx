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

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-16">
            {t('projects.title')}
          </h1>
          <LoadingSkeletons />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-16">
            {t('projects.title')}
          </h1>
          <div className="text-center py-20">
            <p className="text-lg text-black/70">
              {language === 'en' 
                ? 'Unable to load projects. Please try again later.' 
                : 'تعذر تحميل المشاريع. يرجى المحاولة مرة أخرى لاحقاً.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-16">
            {t('projects.title')}
          </h1>
          <div className="text-center py-20">
            <p className="text-lg text-black/70">
              {language === 'en' 
                ? 'No projects available yet.' 
                : 'لا توجد مشاريع متاحة حتى الآن.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-16">
          {t('projects.title')}
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/projects/${project.slug.current}`}
              className="group border border-black hover:bg-black hover:text-white transition-colors"
            >
              {project.featuredImage ? (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={urlFor(project.featuredImage).width(800).height(600).url()}
                    alt={language === 'en' ? project.title.en : project.title.ar}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gray-100" />
              )}
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <h2 className="text-xl font-light">
                    {language === 'en' ? project.title.en : project.title.ar}
                  </h2>
                  {project.year && <span className="text-sm">{project.year}</span>}
                </div>
                {project.description && (
                  <p className="text-sm line-clamp-3">
                    {language === 'en' ? project.description.en : project.description.ar}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
