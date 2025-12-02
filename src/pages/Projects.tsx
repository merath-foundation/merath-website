<<<<<<< HEAD
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
=======
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const projects = [
  {
    id: 'oral-histories',
    titleEn: 'Oral Histories of Tripoli',
    titleAr: 'التواريخ الشفوية لطرابلس',
    year: '2024',
    descriptionEn: 'A documentation project capturing the personal narratives and memories of Tripoli residents across generations.',
    descriptionAr: 'مشروع توثيقي يلتقط السرديات الشخصية وذكريات سكان طرابلس عبر الأجيال.',
  },
  {
    id: 'souk-restoration',
    titleEn: 'Souk Restoration Initiative',
    titleAr: 'مبادرة ترميم السوق',
    year: '2023',
    descriptionEn: 'Collaborative effort to document and restore traditional architectural elements of historic souks.',
    descriptionAr: 'جهد تعاوني لتوثيق وترميم العناصر المعمارية التقليدية للأسواق التاريخية.',
  },
  {
    id: 'textile-traditions',
    titleEn: 'Textile Traditions',
    titleAr: 'تقاليد النسيج',
    year: '2023',
    descriptionEn: 'Exploring the craft and cultural significance of traditional textile production in the region.',
    descriptionAr: 'استكشاف الحرفة والأهمية الثقافية لإنتاج النسيج التقليدي في المنطقة.',
  },
  {
    id: 'photography-archive',
    titleEn: 'Community Photography Archive',
    titleAr: 'أرشيف التصوير المجتمعي',
    year: '2024',
    descriptionEn: 'Building a digital archive of historical and contemporary photographs from community collections.',
    descriptionAr: 'بناء أرشيف رقمي للصور التاريخية والمعاصرة من المجموعات المجتمعية.',
  },
  {
    id: 'music-heritage',
    titleEn: 'Musical Heritage',
    titleAr: 'التراث الموسيقي',
    year: '2022',
    descriptionEn: 'Recording and preserving traditional musical practices and instruments from the coastal region.',
    descriptionAr: 'تسجيل والحفاظ على الممارسات الموسيقية التقليدية والآلات من المنطقة الساحلية.',
  },
  {
    id: 'culinary-narratives',
    titleEn: 'Culinary Narratives',
    titleAr: 'السرديات الطهوية',
    year: '2024',
    descriptionEn: 'Documenting food traditions, recipes, and the social history embedded in local cuisine.',
    descriptionAr: 'توثيق تقاليد الطعام والوصفات والتاريخ الاجتماعي المتجذر في المطبخ المحلي.',
  },
];

export function Projects() {
  const { language, t } = useLanguage();

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="eatable-text mb-16">
          {t('projects.title')}
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group border border-black hover:bg-black hover:text-white transition-colors"
            >
              <div className="aspect-[4/3] bg-gray-100" />
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <h2>
                    {language === 'en' ? project.titleEn : project.titleAr}
                  </h2>
                  <span className="text-sm">{project.year}</span>
                </div>
                <p>
                  {language === 'en' ? project.descriptionEn : project.descriptionAr}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
>>>>>>> 1834f666793186ec6873134da49b3b6df728ebda
    </div>
  );
}
