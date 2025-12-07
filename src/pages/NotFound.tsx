import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function NotFound() {
  const { language } = useLanguage();

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="hero-label mb-4">
              {language === 'en' ? 'ERROR' : 'خطأ'}
            </p>
            <h1 className="text-[120px] md:text-[160px] font-light mb-4 text-[var(--color-text-primary)]">
              404
            </h1>
            <h2 className="text-3xl mb-6 text-[var(--color-text-primary)]">
              {language === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-12 leading-relaxed">
              {language === 'en'
                ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
                : 'الصفحة التي تبحث عنها قد تكون قد أزيلت أو تم تغيير اسمها أو أنها غير متاحة مؤقتاً.'}
            </p>
            <Link
              to="/"
              className="btn btn-primary"
            >
              {language === 'en' ? 'Return Home' : 'العودة للصفحة الرئيسية'}
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
