import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer mt-24 border-t border-[var(--color-border)] bg-[var(--color-background-subtle)]">
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="text-2xl font-light tracking-tight mb-1" style={{ color: 'var(--color-text-primary)' }}>
              MERATH
            </div>
            <div className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--color-accent-primary)' }}>
              {language === 'en' ? 'CULTURAL FOUNDATION' : 'مؤسسة ثقافية'}
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-[var(--color-text-secondary)]">
              {language === 'en'
                ? 'Preserving and celebrating cultural heritage through documentation, community engagement, and innovative exhibition.'
                : 'الحفاظ على التراث الثقافي والاحتفال به من خلال التوثيق والمشاركة المجتمعية والمعرض المبتكر.'}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h6 className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--color-text-primary)' }}>
              {language === 'en' ? 'QUICK LINKS' : 'روابط سريعة'}
            </h6>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  {language === 'en' ? 'About Us' : 'معلومات عنا'}
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  {language === 'en' ? 'Projects' : 'المشاريع'}
                </Link>
              </li>
              <li>
                <Link
                  to="/archive"
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  {language === 'en' ? 'Archive' : 'الأرشيف'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h6 className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--color-text-primary)' }}>
              {language === 'en' ? 'CONTACT' : 'اتصل'}
            </h6>
            <a
              href="mailto:info@merath.org"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
            >
              info@merath.org
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-[var(--color-text-tertiary)]">
            © {currentYear} MERATH Cultural Foundation. {language === 'en' ? 'All rights reserved.' : 'كل الحقوق محفوظة.'}
          </p>
          
          <div className="flex gap-6">
            <button 
              onClick={() => console.log('Privacy Policy')} 
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors bg-transparent border-0 cursor-pointer p-0"
            >
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </button>
            <button 
              onClick={() => console.log('Terms of Service')} 
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors bg-transparent border-0 cursor-pointer p-0"
            >
              {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
