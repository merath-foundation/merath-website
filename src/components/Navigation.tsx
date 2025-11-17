import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export function Navigation() {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-black">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="hover:opacity-50 transition-opacity"
          >
            Merath
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/projects"
              className={`hover:opacity-50 transition-opacity ${
                isActive('/projects') ? 'underline' : ''
              }`}
            >
              {t('nav.projects')}
            </Link>
            <Link
              to="/archive"
              className={`hover:opacity-50 transition-opacity ${
                isActive('/archive') ? 'underline' : ''
              }`}
            >
              {t('nav.archive')}
            </Link>
            <Link
              to="/about"
              className={`hover:opacity-50 transition-opacity ${
                isActive('/about') ? 'underline' : ''
              }`}
            >
              {t('nav.about')}
            </Link>
          </div>
        </div>

        <button
          onClick={toggleLanguage}
          className="border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
        >
          {language === 'en' ? 'AR' : 'EN'}
        </button>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden px-6 pb-4 flex gap-4">
        <Link
          to="/projects"
          className={`hover:opacity-50 transition-opacity ${
            isActive('/projects') ? 'underline' : ''
          }`}
        >
          {t('nav.projects')}
        </Link>
        <Link
          to="/archive"
          className={`hover:opacity-50 transition-opacity ${
            isActive('/archive') ? 'underline' : ''
          }`}
        >
          {t('nav.archive')}
        </Link>
        <Link
          to="/about"
          className={`hover:opacity-50 transition-opacity ${
            isActive('/about') ? 'underline' : ''
          }`}
        >
          {t('nav.about')}
        </Link>
      </div>
    </nav>
  );
}
