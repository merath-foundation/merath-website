import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export function Landing() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h1 className="eatable-text mb-4">
            {t('landing.hero')}
          </h1>
          <p className="eatable-text">
            {t('landing.subtitle')}
          </p>
        </div>
      </section>

      {/* Teasers Section */}
      <section className="max-w-screen-xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12">
        {/* Projects Teaser */}
        <Link 
          to="/projects" 
          className="group border border-black p-6 hover:bg-black hover:text-white transition-colors"
        >
          <div className="aspect-[4/3] bg-gray-100 mb-4" />
          <h2 className="eatable-text mb-3">
            {t('landing.projects.title')}
          </h2>
          <p>
            {t('landing.projects.text')}
          </p>
        </Link>

        {/* Archive Teaser */}
        <Link 
          to="/archive" 
          className="group border border-black p-6 hover:bg-black hover:text-white transition-colors"
        >
          <div className="aspect-[4/3] bg-gray-100 mb-4" />
          <h2 className="eatable-text mb-3">
            {t('landing.archive.title')}
          </h2>
          <p>
            {t('landing.archive.text')}
          </p>
        </Link>

        {/* About Teaser */}
        <Link 
          to="/about" 
          className="group border border-black p-6 hover:bg-black hover:text-white transition-colors"
        >
          <div className="aspect-[4/3] bg-gray-100 mb-4" />
          <h2 className="eatable-text mb-3">
            {t('landing.about.title')}
          </h2>
          <p>
            {t('landing.about.text')}
          </p>
        </Link>
      </section>
    </div>
  );
}
