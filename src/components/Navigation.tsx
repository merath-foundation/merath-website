import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export function Navigation() {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-neutral-200 z-50">
      <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="tracking-tight hover:opacity-60 transition-opacity"
        >
          Merath
        </Link>

        <div className="flex items-center gap-12">
          <div className="flex items-center gap-8">
            <Link
              to="/projects"
              className={`hover:opacity-60 transition-opacity ${
                isActive('/projects') ? 'opacity-100' : 'opacity-70'
              }`}
            >
              {t('nav.projects')}
            </Link>
            <Link
              to="/archive"
              className={`hover:opacity-60 transition-opacity ${
                isActive('/archive') ? 'opacity-100' : 'opacity-70'
              }`}
            >
              {t('nav.archive')}
            </Link>
            <Link
              to="/about"
              className={`hover:opacity-60 transition-opacity ${
                isActive('/about') ? 'opacity-100' : 'opacity-70'
              }`}
            >
              {t('nav.about')}
            </Link>
          </div>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-300 hover:bg-neutral-50 transition-colors"
            aria-label="Toggle language"
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm uppercase">{language === 'en' ? 'عربي' : 'English'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
