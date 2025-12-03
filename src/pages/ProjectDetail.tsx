import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useSanity } from '../hooks/useSanity';
import { urlFor } from '../lib/sanity';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LoadingSkeletons } from '../components/LoadingSkeletons';

interface Project {
  _id: string;
  slug: { current: string };
  title: { en: string; ar: string };
  year?: string;
  description?: { en: string; ar: string };
  overview?: { en: string; ar: string };
  approach?: { en: string; ar: string };
  outcomes?: { en: string; ar: string };
  featuredImage?: any;
  publishedAt?: string;
}

export function ProjectDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const { data: projects, loading, error } = useSanity(
    `*[_type == "project" && slug.current == $slug]`,
    { slug: id }
  ) as { data: Project[] | null; loading: boolean; error: Error | null };

  const project = projects?.[0];

  // Also fetch related projects
  const { data: relatedProjects } = useSanity(
    `*[_type == "project" && slug.current != $slug] | order(publishedAt desc) [0...3]`,
    { slug: id }
  ) as { data: Project[] | null };

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <LoadingSkeletons />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-black/70 mb-4">
            {language === 'en' ? 'Project not found' : 'المشروع غير موجود'}
          </p>
          <Link to="/projects" className="underline hover:opacity-50 transition-opacity">
            {t('project.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 mb-8 hover:opacity-50 transition-opacity"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          {t('project.back')}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-baseline justify-between mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-black">
              {language === 'en' ? project.title.en : project.title.ar}
            </h1>
            {project.year && <span>{project.year}</span>}
          </div>
        </div>

        {/* Featured Image */}
        {project.featuredImage && (
          <div className="mb-12">
            <img
              src={urlFor(project.featuredImage).width(1200).height(750).url()}
              alt={language === 'en' ? project.title.en : project.title.ar}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Overview */}
        {project.overview && (
          <div className="mb-16 leading-relaxed">
            <h2 className="text-2xl font-light mb-4">
              {language === 'en' ? 'Overview' : 'نظرة عامة'}
            </h2>
            <p className="text-lg text-black/80 whitespace-pre-line">
              {language === 'en' ? project.overview.en : project.overview.ar}
            </p>
          </div>
        )}

        {/* Approach */}
        {project.approach && (
          <div className="mb-16 leading-relaxed">
            <h2 className="text-2xl font-light mb-4">
              {language === 'en' ? 'Approach' : 'النهج'}
            </h2>
            <p className="text-lg text-black/80 whitespace-pre-line">
              {language === 'en' ? project.approach.en : project.approach.ar}
            </p>
          </div>
        )}

        {/* Outcomes */}
        {project.outcomes && (
          <div className="mb-16 leading-relaxed">
            <h2 className="text-2xl font-light mb-4">
              {language === 'en' ? 'Outcomes' : 'النتائج'}
            </h2>
            <p className="text-lg text-black/80 whitespace-pre-line">
              {language === 'en' ? project.outcomes.en : project.outcomes.ar}
            </p>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects && relatedProjects.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-black mb-6">
              {t('project.related')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((related: Project) => (
                <Link
                  key={related._id}
                  to={`/projects/${related.slug.current}`}
                  className="group"
                >
                  {related.featuredImage ? (
                    <div className="aspect-[4/3] overflow-hidden mb-3">
                      <img
                        src={urlFor(related.featuredImage).width(400).height(300).url()}
                        alt={language === 'en' ? related.title.en : related.title.ar}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gray-100 mb-3" />
                  )}
                  <h3 className="font-light group-hover:underline">
                    {language === 'en' ? related.title.en : related.title.ar}
                  </h3>
                  {related.year && (
                    <p className="text-sm opacity-60">{related.year}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
