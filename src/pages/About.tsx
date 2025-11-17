import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const team = [
  {
    nameEn: 'Layla Mansour',
    nameAr: 'ليلى منصور',
    roleEn: 'Director',
    roleAr: 'المدير',
    bioEn: 'Cultural researcher and curator with over fifteen years of experience in heritage preservation and community engagement.',
    bioAr: 'باحثة ثقافية ومنسقة معارض مع أكثر من خمسة عشر عامًا من الخبرة في الحفاظ على التراث والمشاركة المجتمعية.',
  },
  {
    nameEn: 'Ahmed Hassan',
    nameAr: 'أحمد حسن',
    roleEn: 'Research Coordinator',
    roleAr: 'منسق البحوث',
    bioEn: 'Historian specializing in oral history methodologies and urban cultural studies.',
    bioAr: 'مؤرخ متخصص في منهجيات التاريخ الشفوي والدراسات الثقافية الحضرية.',
  },
  {
    nameEn: 'Sara Khalil',
    nameAr: 'سارة خليل',
    roleEn: 'Archive Manager',
    roleAr: 'مدير الأرشيف',
    bioEn: 'Digital archivist focused on preservation technologies and accessible documentation systems.',
    bioAr: 'أمين أرشيف رقمي يركز على تقنيات الحفظ وأنظمة التوثيق التي يسهل الوصول إليها.',
  },
  {
    nameEn: 'Omar Khalil',
    nameAr: 'عمر خليل',
    roleEn: 'Community Liaison',
    roleAr: 'ضابط الاتصال المجتمعي',
    bioEn: 'Community organizer with deep roots in Tripoli, facilitating connections between the foundation and local residents.',
    bioAr: 'منظم مجتمعي له جذور عميقة في طرابلس، يسهل الاتصالات بين المؤسسة والسكان المحليين.',
  },
];

const collaborators = [
  'American University of Beirut',
  'Arab Image Foundation',
  'Lebanese Association for History',
  'Tripoli Municipality',
  'Institut Français du Liban',
  'Goethe-Institut Libanon',
  'Local Heritage Initiative',
  'Center for Lebanese Studies',
  'ALBA (Académie Libanaise des Beaux-Arts)',
];

export function About() {
  const { language, t } = useLanguage();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    setContactForm({ name: '', email: '', message: '' });
    alert(language === 'en' ? 'Thank you for your message!' : 'شكراً لرسالتك!');
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="eatable-text mb-16">
          {t('about.title')}
        </h1>

        {/* Mission Statement */}
        <section className="mb-20 max-w-3xl">
          <h2 className="eatable-text mb-6">
            {t('about.statement.title')}
          </h2>
          <p className="leading-relaxed">
            {t('about.statement.text')}
          </p>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="eatable-text mb-8">
            {t('about.team.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div key={index} className="border border-black p-6">
                <h3 className="mb-1">
                  {language === 'en' ? member.nameEn : member.nameAr}
                </h3>
                <p className="opacity-60 mb-3">
                  {language === 'en' ? member.roleEn : member.roleAr}
                </p>
                <p>
                  {language === 'en' ? member.bioEn : member.bioAr}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Collaborators */}
        <section className="mb-20">
          <h2 className="eatable-text mb-8">
            {t('about.collaborators.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {collaborators.map((collaborator, index) => (
              <div
                key={index}
                className="border border-black p-4 text-center flex items-center justify-center min-h-24"
              >
                {collaborator}
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-3xl">
          <h2 className="eatable-text mb-8">
            {t('about.contact.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="mb-3">
                {t('about.contact.email')}
              </h3>
              <a 
                href="mailto:info@merath.org"
                className="underline hover:opacity-50 transition-opacity"
              >
                info@merath.org
              </a>

              <h3 className="mb-3 mt-8">
                {t('about.contact.social')}
              </h3>
              <div className="space-y-2">
                <a 
                  href="#" 
                  className="block underline hover:opacity-50 transition-opacity"
                >
                  Instagram
                </a>
                <a 
                  href="#" 
                  className="block underline hover:opacity-50 transition-opacity"
                >
                  Facebook
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">
                  {t('about.contact.form.name')}
                </label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full border border-black px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">
                  {t('about.contact.form.email')}
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full border border-black px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">
                  {t('about.contact.form.message')}
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full border border-black px-4 py-2 min-h-32"
                  required
                />
              </div>

              <button
                type="submit"
                className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
              >
                {t('about.contact.form.submit')}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
