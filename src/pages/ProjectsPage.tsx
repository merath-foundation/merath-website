import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProjectsGrid from '../components/ProjectsGrid';
import ProjectTile from '../components/ProjectTile';
import { sanityClient, sanityConfig } from '../lib/sanityClient';
import { Project } from '../types/project';
import logo from '../assets/merath_logo_transparent.png';
import './ProjectsPage.css';

interface ProjectsPageProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ direction, language, setLanguage }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refToImageUrl = (ref?: string) => {
    if (!ref) return undefined;
    const parts = ref.split('-');
    if (parts.length < 3) return undefined;
    const id = parts[1];
    const dim = parts[2];
    const format = parts[3] || 'jpg';
    return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}-${dim}.${format}`;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data: any[] = await sanityClient.fetch(`*[_type == "project"] | order(featured desc, coalesce(order, 999999) asc, coalesce(_createdAt, now()) desc) {
          _id,
          slug,
          titleEn,
          titleAr,
          title,
          subtitle,
          excerptEn,
          excerptAr,
          shortDescription,
          categoryEn,
          categoryAr,
          bodyEn,
          bodyAr,
          fullDescription,
          year,
          order,
          featured,
          sourceUrl,
          "imageUrl": image.asset->url,
          "imageRef": image.asset->_ref,
          "imageUrlLegacy": imageUrl
        }`);

        const mapped: Project[] = data.map((p, idx) => {
          const id = p.slug?.current || p._id;
          const shortEn = p.shortDescription?.en;
          const shortAr = p.shortDescription?.ar;
          const subEn = p.subtitle?.en;
          const subAr = p.subtitle?.ar;
          return {
            id,
            slug: p.slug?.current,
            order: typeof p.order === 'number' ? p.order : idx + 1,
            titleEn: p.titleEn || p.title || subEn || shortEn,
            titleAr: p.titleAr || p.title || subAr || shortAr,
            excerptEn: p.excerptEn || shortEn || subEn,
            excerptAr: p.excerptAr || shortAr || subAr,
            categoryEn: p.categoryEn || subEn,
            categoryAr: p.categoryAr || subAr,
            bodyEn: p.bodyEn || p.fullDescription?.en || shortEn,
            bodyAr: p.bodyAr || p.fullDescription?.ar || shortAr,
            year: p.year,
            featured: Boolean(p.featured),
            imageUrl: p.imageUrl || p.imageUrlLegacy || refToImageUrl(p.imageRef),
            sourceUrl: p.sourceUrl,
          };
        });

        setProjects(mapped);
        setLoading(false);
      } catch (err: any) {
        console.error('Failed to load projects', err);
        const message = err?.message || (language === 'ar' ? 'تعذر تحميل المشاريع' : 'Failed to load projects');
        setError(message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [language]);

  return (
    <div className="projects-page" dir={direction}>
      <NavBar direction={direction} language={language} setLanguage={setLanguage} />
      
      {/* Header with centered logo */}
      <header className="page-logo-header">
        <img src={logo} alt="Merath Logo" className="page-logo" />
        <h1 className="page-logo-title">MERATH</h1>
      </header>
      
      {/* Main content wrapper - ensures consistent max-width and centering */}
      <main className="projects-main">
        {loading && (
          <p className="projects-loading">{language === 'ar' ? 'جاري تحميل المشاريع...' : 'Loading projects...'}</p>
        )}
        {error && <p className="projects-error">{error}</p>}

        {!loading && !error && (
          <section className="projects-grid-section">
            <h2 className="projects-section-title">
              {language === 'ar' ? 'المشاريع' : 'Projects'}
            </h2>

            {/* Featured projects rendered in a single-column list above the grid */}
            {projects.filter((p) => p.featured).length > 0 && (
              <div className="projects-featured-section">
                <h3 className="projects-featured-title">{language === 'ar' ? 'مختارات' : 'Featured'}</h3>
                <div className="projects-featured-list">
                  {projects
                    .filter((p) => p.featured)
                    .map((p) => (
                      <div key={`featured-${p.id}`} className="projects-featured-item">
                        <ProjectTile project={p} direction={direction} variant="featured" />
                      </div>
                    ))}
                </div>
              </div>
            )}

            <ProjectsGrid projects={projects} direction={direction} />
            {projects.length === 0 && (
              <p className="projects-empty">{language === 'ar' ? 'لا توجد مشاريع منشورة بعد.' : 'No projects published yet.'}</p>
            )}
          </section>
        )}
      </main>

      <Footer language={language} />
    </div>
  );
};

export default ProjectsPage;
