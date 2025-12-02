<<<<<<< HEAD
export function About() {
  return (
    <div className="about-page">
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4">
              About Merath Cultural Foundation
            </h1>
            <div className="w-16 h-0.5 bg-black/20"></div>
          </div>

          {/* Mission */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">Mission</h2>
            <div className="max-w-3xl">
              <p className="text-lg text-black/70 leading-relaxed">
                Merath Cultural Foundation is dedicated to preserving and celebrating cultural heritage through 
                documentation, community engagement, and innovative presentation. We believe that every community's 
                stories, traditions, and knowledge systems deserve careful preservation and respectful sharing.
              </p>
            </div>
          </div>

          {/* Approach */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">Approach</h2>
            <div className="max-w-3xl">
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                Our work is grounded in collaboration and respect. We partner with communities to ensure that 
                cultural documentation reflects authentic voices and perspectives. Every project begins with 
                listening and builds toward shared goals.
              </p>
              <p className="text-lg text-black/70 leading-relaxed">
                We combine traditional research methods with contemporary digital tools, always prioritizing 
                ethical practices and community benefit over institutional gain.
              </p>
            </div>
          </div>

          {/* Areas of Focus */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">Areas of Focus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div>
                <h3 className="text-xl font-medium text-black mb-3">Oral Histories</h3>
                <p className="text-black/70 leading-relaxed">
                  Recording and preserving community narratives and personal testimonies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-black mb-3">Cultural Practices</h3>
                <p className="text-black/70 leading-relaxed">
                  Documenting traditional crafts, rituals, and knowledge systems.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-black mb-3">Heritage Sites</h3>
                <p className="text-black/70 leading-relaxed">
                  Researching and recording places of cultural and historical significance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-black mb-3">Digital Archives</h3>
                <p className="text-black/70 leading-relaxed">
                  Creating accessible collections that serve communities and researchers.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="bg-white border border-black/10 rounded p-8 md:p-12 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">Contact & Support</h2>
            <p className="text-lg text-black/70 leading-relaxed mb-6">
              We welcome collaboration, partnership inquiries, and community-initiated projects. 
              If you're interested in working with us or supporting our mission, please reach out.
            </p>
            <a 
              href="mailto:info@merath.org" 
              className="inline-flex items-center justify-center px-8 py-3 bg-[#A0695F] text-white font-medium rounded hover:bg-[#8B5A50] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
=======
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
>>>>>>> 1834f666793186ec6873134da49b3b6df728ebda
    </div>
  );
}
