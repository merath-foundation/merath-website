import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.projects': { en: 'Projects', ar: 'المشاريع' },
  'nav.archive': { en: 'Archive/Exhibition Production', ar: 'الأرشيف/إنتاج المعارض' },
  'nav.about': { en: 'About', ar: 'عن المؤسسة' },
  
  // Home
  'home.statement': {
    en: 'Preserving the narratives that shape our collective memory and cultural identity',
    ar: 'حفظ الروايات التي تشكل ذاكرتنا الجماعية وهويتنا الثقافية'
  },
  'home.projects.title': { en: 'Projects', ar: 'المشاريع' },
  'home.projects.description': {
    en: 'We document and preserve cultural heritage through innovative research methodologies, community engagement, and digital archiving. Each project represents a collaborative effort to safeguard stories, traditions, and artifacts that define our shared heritage across generations.',
    ar: 'نوثق ونحافظ على التراث الثقافي من خلال منهجيات بحثية مبتكرة والمشاركة المجتمعية والأرشفة الرقمية. يمثل كل مشروع جهداً تعاونياً لحماية القصص والتقاليد والقطع الأثرية التي تحدد تراثنا المشترك عبر الأجيال.'
  },
  'home.archive.title': { en: 'Archive/Exhibition Production', ar: 'الأرشيف/إنتاج المعارض' },
  'home.archive.description': {
    en: 'Our archive serves as a living repository of cultural memory, transforming personal and collective stories into accessible exhibitions. We collaborate with communities to curate experiences that illuminate historical narratives and contemporary cultural dialogues.',
    ar: 'يعمل أرشيفنا كمستودع حي للذاكرة الثقافية، يحول القصص الشخصية والجماعية إلى معارض متاحة. نتعاون مع المجتمعات لتنظيم تجارب تسلط الضوء على الروايات التاريخية والحوارات الثقافية المعاصرة.'
  },
  'home.about.title': { en: 'About', ar: 'عن المؤسسة' },
  'home.about.description': {
    en: 'The Merath Cultural Foundation is dedicated to building bridges between past and present through thoughtful cultural preservation and innovative storytelling. Our interdisciplinary team works across borders to ensure that diverse voices and histories remain accessible for future generations.',
    ar: 'تكرس مؤسسة ميراث الثقافية جهودها لبناء جسور بين الماضي والحاضر من خلال الحفاظ الثقافي المدروس والسرد المبتكر. يعمل فريقنا متعدد التخصصات عبر الحدود لضمان بقاء الأصوات والتواريخ المتنوعة متاحة للأجيال القادمة.'
  },
  
  // Projects Page
  'projects.title': { en: 'Projects', ar: 'المشاريع' },
  
  // Archive Page
  'archive.title': { en: 'Archive/Exhibition Production', ar: 'الأرشيف/إنتاج المعارض' },
  'archive.intro.title': { en: 'Curating Cultural Memory', ar: 'تنظيم الذاكرة الثقافية' },
  'archive.intro.left': {
    en: 'The Merath archive is more than a collection—it is a dynamic platform where personal stories intersect with broader cultural narratives. Through meticulous documentation and community partnerships, we transform ephemeral memories into enduring exhibitions that spark dialogue and understanding.',
    ar: 'أرشيف ميراث هو أكثر من مجرد مجموعة—إنه منصة ديناميكية حيث تتقاطع القصص الشخصية مع الروايات الثقافية الأوسع. من خلال التوثيق الدقيق والشراكات المجتمعية، نحول الذكريات الزائلة إلى معارض دائمة تثير الحوار والفهم.'
  },
  'archive.intro.right': {
    en: 'Our production process is collaborative and inclusive, ensuring that the voices of contributors remain central to every exhibition. We believe that cultural heritage belongs to the communities who create and sustain it, and our role is to amplify these narratives with integrity and care.',
    ar: 'عملية إنتاجنا تعاونية وشاملة، تضمن بقاء أصوات المساهمين في قلب كل معرض. نؤمن بأن التراث الثقافي ينتمي إلى المجتمعات التي تخلقه وتحافظ عليه، ودورنا هو تضخيم هذه الروايات بنزاهة وعناية.'
  },
  'archive.contribute.title': { en: 'Contribute Your Story', ar: 'ساهم بقصتك' },
  'archive.contribute.description': {
    en: 'We invite you to share your cultural memories, family histories, and personal artifacts. Your contribution helps us build a more complete picture of our shared heritage.',
    ar: 'ندعوك لمشاركة ذكرياتك الثقافية وتواريخ عائلتك وقطعك الأثرية الشخصية. مساهمتك تساعدنا في بناء صورة أكثر اكتمالاً لتراثنا المشترك.'
  },
  'archive.form.name': { en: 'Your Name', ar: 'اسمك' },
  'archive.form.email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
  'archive.form.story': { en: 'Tell us your story...', ar: 'أخبرنا قصتك...' },
  'archive.form.submit': { en: 'Submit Contribution', ar: 'إرسال المساهمة' },
  'archive.cases.title': { en: 'Case Studies', ar: 'دراسات الحالة' },
  
  // About Page
  'about.title': { en: 'About', ar: 'عن المؤسسة' },
  'about.statement.title': { en: 'Foundation Statement', ar: 'بيان المؤسسة' },
  'about.statement.text': {
    en: 'Founded on the principle that cultural memory is a collective responsibility, the Merath Cultural Foundation serves as a bridge between generations, communities, and traditions. We believe that every story matters, every artifact carries meaning, and every voice deserves to be heard. Through rigorous research, inclusive methodologies, and creative exhibition practices, we work to ensure that the diverse tapestry of human experience remains visible and accessible. Our commitment extends beyond preservation—we actively engage with contemporary cultural production, fostering dialogue that honors the past while embracing the complexities of the present.',
    ar: 'تأسست مؤسسة ميراث الثقافية على مبدأ أن الذاكرة الثقافية مسؤولية جماعية، وتعمل كجسر بين الأجيال والمجتمعات والتقاليد. نؤمن بأن كل قصة مهمة، وكل قطعة أثرية تحمل معنى، وكل صوت يستحق أن يُسمع. من خلال البحث الدقيق والمنهجيات الشاملة وممارسات المعارض الإبداعية، نعمل لضمان بقاء نسيج التجربة الإنسانية المتنوع مرئياً ومتاحاً. يمتد التزامنا إلى ما هو أبعد من الحفظ—نشارك بنشاط في الإنتاج الثقافي المعاصر، معززين حواراً يكرم الماضي مع احتضان تعقيدات الحاضر.'
  },
  'about.team.title': { en: 'Team', ar: 'الفريق' },
  'about.team.role1': { en: 'Director & Founder', ar: 'المديرة والمؤسسة' },
  'about.team.role2': { en: 'Head of Archive', ar: 'رئيس الأرشيف' },
  'about.team.role3': { en: 'Senior Researcher', ar: 'باحث أول' },
  'about.team.bio1': {
    en: 'Layla Hassan brings over fifteen years of experience in cultural preservation and community-driven research. Her work focuses on participatory methodologies that center marginalized voices in heritage narratives.',
    ar: 'تقدم ليلى حسان أكثر من خمسة عشر عاماً من الخبرة في الحفاظ الثقافي والبحث المجتمعي. يركز عملها على المنهجيات التشاركية التي تضع الأصوات المهمشة في قلب روايات التراث.'
  },
  'about.team.bio2': {
    en: 'Omar Khalil specializes in digital archiving and exhibition design. He has developed innovative systems for preserving oral histories and material culture across diverse cultural contexts.',
    ar: 'يتخصص عمر خليل في الأرشفة الرقمية وتصميم المعارض. طور أنظمة مبتكرة لحفظ التواريخ الشفوية والثقافة المادية عبر السياقات الثقافية المتنوعة.'
  },
  'about.team.bio3': {
    en: 'Sara Al-Mansour conducts field research on traditional practices and contemporary cultural production. Her ethnographic approach emphasizes collaboration and ethical documentation.',
    ar: 'تجري سارة المنصور بحوثاً ميدانية حول الممارسات التقليدية والإنتاج الثقافي المعاصر. يؤكد نهجها الإثنوغرافي على التعاون والتوثيق الأخلاقي.'
  },
  'about.collaborators.title': { en: 'Collaborators & Partners', ar: 'المتعاونون والشركاء' },
  'about.contact.title': { en: 'Get In Touch', ar: 'تواصل معنا' },
  'about.contact.description': {
    en: 'Whether you have a project idea, want to contribute to our archive, or explore partnership opportunities, we would love to hear from you.',
    ar: 'سواء كانت لديك فكرة مشروع أو ترغب في المساهمة في أرشيفنا أو استكشاف فرص الشراكة، نود أن نسمع منك.'
  },
  'about.form.name': { en: 'Name', ar: 'الاسم' },
  'about.form.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'about.form.subject': { en: 'Subject', ar: 'الموضوع' },
  'about.form.message': { en: 'Message', ar: 'الرسالة' },
  'about.form.send': { en: 'Send Message', ar: 'إرسال الرسالة' },
  
  // Project Detail
  'project.back': { en: '← Back to Projects', ar: '→ العودة إلى المشاريع' },
  'project.overview': { en: 'Overview', ar: 'نظرة عامة' },
  'project.approach': { en: 'Approach', ar: 'المنهجية' },
  'project.outcomes': { en: 'Outcomes', ar: 'النتائج' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
