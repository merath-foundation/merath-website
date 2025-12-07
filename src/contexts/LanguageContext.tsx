import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

const STORAGE_KEY = 'merath-language';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'ar' ? 'ar' : 'en';
};

const translations: Record<string, Record<string, string>> = {
  'projects.title': { en: 'Projects', ar: 'المشاريع' },
  'project.back': { en: '← Back to Projects', ar: 'العودة إلى المشاريع ←' },
  'project.credits': { en: 'Credits', ar: 'التقديرات' },
  'project.related': { en: 'Related Projects', ar: 'مشاريع ذات صلة' },
};

interface LanguageState {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageState | undefined>(undefined);

export function LanguageProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    document.body.setAttribute('dir', direction);
    document.body.dataset.language = language;
  }, [direction, language]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({ language, direction, setLanguage, t }),
    [language, direction]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
