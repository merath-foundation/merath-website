import { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert(language === 'en' ? 'Thank you for your message!' : 'شكراً لرسالتك!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const teamMembers = [
    {
      name: {
        en: 'Layla Hassan',
        ar: 'ليلى حسان'
      },
      role: t('about.team.role1'),
      bio: t('about.team.bio1'),
      image: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Mjk4NTQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: {
        en: 'Omar Khalil',
        ar: 'عمر خليل'
      },
      role: t('about.team.role2'),
      bio: t('about.team.bio2'),
      image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjMwNzI0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: {
        en: 'Sara Al-Mansour',
        ar: 'سارة المنصور'
      },
      role: t('about.team.role3'),
      bio: t('about.team.bio3'),
      image: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2Mjk4NTQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const collaborators = [
    { name: 'Cultural Heritage Institute', en: true },
    { name: 'معهد الدراسات الثقافية', ar: true },
    { name: 'National Archive Foundation', en: true },
    { name: 'مؤسسة الأرشيف الوطني', ar: true },
    { name: 'Urban Research Collective', en: true },
    { name: 'مركز الأبحاث المعاصرة', ar: true },
    { name: 'Digital Heritage Lab', en: true },
    { name: 'جمعية حفظ التراث', ar: true },
    { name: 'Community Arts Network', en: true },
    { name: 'شبكة الفنون المجتمعية', ar: true },
    { name: 'Oral History Association', en: true },
    { name: 'مركز التاريخ الشفوي', ar: true }
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-[1400px] mx-auto">
        <h1 className="mb-16">
          {t('about.title')}
        </h1>

        {/* Foundation statement */}
        <div className="mb-24">
          <h2 className="mb-8">
            {t('about.statement.title')}
          </h2>
          <div className="max-w-[900px]">
            <p className="leading-relaxed text-neutral-700">
              {t('about.statement.text')}
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <h2 className="mb-12">
            {t('about.team.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index}>
                <div className="aspect-[3/4] bg-neutral-100 mb-6">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name[language]}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <h3 className="mb-1">
                  {member.name[language]}
                </h3>
                <p className="text-sm text-neutral-500 mb-4">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborators */}
        <div className="mb-24">
          <h2 className="mb-12">
            {t('about.collaborators.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
            {collaborators.map((collaborator, index) => (
              <div
                key={index}
                className="py-4 border-b border-neutral-200 text-sm text-neutral-600"
              >
                {collaborator.name}
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="mb-4">
            {t('about.contact.title')}
          </h2>
          <p className="mb-8 max-w-[600px] text-neutral-600 leading-relaxed">
            {t('about.contact.description')}
          </p>
          <div className="max-w-[600px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  placeholder={t('about.form.name')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder={t('about.form.email')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <Input
                type="text"
                placeholder={t('about.form.subject')}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
              <Textarea
                placeholder={t('about.form.message')}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
              />
              <Button type="submit">
                {t('about.form.send')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
