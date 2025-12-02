import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageState {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
}

<<<<<<< HEAD
const LanguageContext = createContext<LanguageState | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [direction, setDirection] = useState<Direction>('ltr');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setDirection(lang === 'ar' ? 'rtl' : 'ltr');
  };
=======
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.archive': 'Archive',
    'nav.about': 'About',
    
    // Landing
    'landing.hero': 'Merath Cultural Foundation',
    'landing.subtitle': 'Preserving and celebrating cultural heritage in Tripoli',
    'landing.projects.title': 'Projects',
    'landing.projects.text': 'Explore our ongoing and completed cultural initiatives that aim to preserve, document, and celebrate the rich heritage of Tripoli and the broader region through community engagement and artistic expression.',
    'landing.archive.title': 'Archive & Exhibition Production',
    'landing.archive.text': 'Discover our extensive digital archive of cultural materials and learn about our exhibition production services that bring historical narratives to life through contemporary curatorial practices.',
    'landing.about.title': 'About',
    'landing.about.text': 'Learn more about Merath Cultural Foundation, our mission to safeguard cultural memory, our team of dedicated professionals, and the collaborators who make our work possible.',
    
    // Projects
    'projects.title': 'Projects',
    
    // Archive
    'archive.title': 'Archive & Exhibition Production',
    'archive.intro.title': 'Our Archive',
    'archive.intro.text': 'The Merath Archive is a growing digital repository of photographs, documents, oral histories, and artifacts that document the cultural life of Tripoli. We believe that preserving these materials is essential for maintaining cultural memory and enabling future research and creative work.',
    'archive.contribute.title': 'Contribute to the Archive',
    'archive.contribute.name': 'Your Name',
    'archive.contribute.description': 'Description of Material',
    'archive.contribute.file': 'Upload File',
    'archive.contribute.consent': 'I consent to sharing this material with the Merath Archive',
    'archive.contribute.submit': 'Submit',
    'archive.exhibition.title': 'Exhibition Production',
    
    // About
    'about.title': 'About',
    'about.statement.title': 'Our Mission',
    'about.statement.text': 'Merath Cultural Foundation is dedicated to preserving and celebrating the cultural heritage of Tripoli. Through our projects, archive, and exhibitions, we create spaces for dialogue, research, and creative expression that honor the past while engaging with the present.',
    'about.team.title': 'Team',
    'about.collaborators.title': 'Collaborators',
    'about.contact.title': 'Contact',
    'about.contact.email': 'Email',
    'about.contact.social': 'Follow Us',
    'about.contact.form.name': 'Name',
    'about.contact.form.email': 'Email',
    'about.contact.form.message': 'Message',
    'about.contact.form.submit': 'Send',
    
    // Project Detail
    'project.credits': 'Credits',
    'project.related': 'Related Projects',
    'project.back': 'Back to Projects',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.projects': 'المشاريع',
    'nav.archive': 'الأرشيف',
    'nav.about': 'عن ميراث',
    
    // Landing
    'landing.hero': 'مؤسسة ميراث الثقافية',
    'landing.subtitle': 'الحفاظ على التراث الثقافي في طرابلس والاحتفاء به',
    'landing.projects.title': 'المشاريع',
    'landing.projects.text': 'استكشف مبادراتنا الثقافية الجارية والمكتملة التي تهدف إلى الحفاظ على التراث الغني لطرابلس والمنطقة الأوسع وتوثيقه والاحتفاء به من خلال المشاركة المجتمعية والتعبير الفني.',
    'landing.archive.title': 'الأرشيف وإنتاج المعارض',
    'landing.archive.text': 'اكتشف أرشيفنا الرقمي الواسع للمواد الثقافية وتعرف على خدمات إنتاج المعارض التي تحيي السرديات التاريخية من خلال الممارسات التنظيمية المعاصرة.',
    'landing.about.title': 'عن ميراث',
    'landing.about.text': 'تعرف على مؤسسة ميراث الثقافية ومهمتنا للحفاظ على الذاكرة الثقافية وفريقنا من المحترفين المتفانين والمتعاونين الذين يجعلون عملنا ممكناً.',
    
    // Projects
    'projects.title': 'المشاريع',
    
    // Archive
    'archive.title': 'الأرشيف وإنتاج المعارض',
    'archive.intro.title': 'أرشيفنا',
    'archive.intro.text': 'أرشيف ميراث هو مستودع رقمي متنامٍ من الصور والوثائق والتاريخ الشفوي والقطع الأثرية التي توثق الحياة الثقافية في طرابلس. نؤمن بأن الحفاظ على هذه المواد ضروري للحفاظ على الذاكرة الثقافية وتمكين البحث والعمل الإبداعي في المستقبل.',
    'archive.contribute.title': 'ساهم في الأرشيف',
    'archive.contribute.name': 'اسمك',
    'archive.contribute.description': 'وصف المادة',
    'archive.contribute.file': 'رفع ملف',
    'archive.contribute.consent': 'أوافق على مشاركة هذه المادة مع أرشيف ميراث',
    'archive.contribute.submit': 'إرسال',
    'archive.exhibition.title': 'إنتاج المعارض',
    
    // About
    'about.title': 'عن ميراث',
    'about.statement.title': 'مهمتنا',
    'about.statement.text': 'تكرس مؤسسة ميراث الثقافية جهودها للحفاظ على التراث الثقافي لطرابلس والاحتفاء به. من خلال مشاريعنا وأرشيفنا ومعارضنا، نخلق مساحات للحوار والبحث والتعبير الإبداعي التي تكرم الماضي وتتفاعل مع الحاضر.',
    'about.team.title': 'الفريق',
    'about.collaborators.title': 'المتعاونون',
    'about.contact.title': 'اتصل بنا',
    'about.contact.email': 'البريد الإلكتروني',
    'about.contact.social': 'تابعنا',
    'about.contact.form.name': 'الاسم',
    'about.contact.form.email': 'البريد الإلكتروني',
    'about.contact.form.message': 'الرسالة',
    'about.contact.form.submit': 'إرسال',
    
    // Project Detail
    'project.credits': 'الاعتمادات',
    'project.related': 'مشاريع ذات صلة',
    'project.back': 'العودة إلى المشاريع',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [scrollPosition, setScrollPosition] = useState(0);
>>>>>>> 1834f666793186ec6873134da49b3b6df728ebda

  // Apply direction and language to document
  useEffect(() => {
<<<<<<< HEAD
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);
=======
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    // Save current scroll position
    setScrollPosition(window.scrollY);
    
    // Toggle language
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    
    // Restore scroll position after a brief delay for re-render
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 50);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };
>>>>>>> 1834f666793186ec6873134da49b3b6df728ebda

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
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
