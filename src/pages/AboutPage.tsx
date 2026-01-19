import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { PortableTextRenderer } from '../components/PortableTextRenderer';
import { sanityClient } from '../lib/sanityClient';
import './AboutPage.css';
import logo from '../assets/merath_logo_transparent.png';

interface AboutPageProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ direction, language, setLanguage }) => {
  const [pageTitle, setPageTitle] = useState<string | null>(null);
  const [body, setBody] = useState<any[] | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        const [aboutData, teamData] = await Promise.all([
          sanityClient.fetch(`*[_type == "page" && slug.current == "about"] | order(_updatedAt desc)[0]{title, titleAr, body, bodyAr, sections[]{heading, headingAr, content, contentAr, images[]{asset->{url}}}}`),
          sanityClient.fetch(`*[_type == "person"] | order(coalesce(formerMember, false) asc, coalesce(order, 9999) asc, name asc){_id, name, nameAr, role, roleAr, bio, bioAr, formerMember, order, "photoUrl": photo.asset->url}`),
        ]);

        const isArabic = language === 'ar';
        setPageTitle(isArabic ? (aboutData?.titleAr || aboutData?.title || null) : (aboutData?.title || aboutData?.titleAr || null));
        setBody(isArabic ? (aboutData?.bodyAr || aboutData?.body || null) : (aboutData?.body || aboutData?.bodyAr || null));
        setSections(aboutData?.sections || []);
        setTeam(teamData || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(language === 'ar' ? 'تعذر تحميل صفحة التعريف' : 'Failed to load About page');
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, [language]);

  return (
    <div className="about-page" dir={direction}>
      <NavBar direction={direction} language={language} setLanguage={setLanguage} />
      
      <header className="page-logo-header">
        <img src={logo} alt="Merath Logo" className="page-logo" />
        <h1 className="page-logo-title">MERATH</h1>
      </header>
      
      <div className="about-text">
        <h1 className="about-heading">{pageTitle || (language === 'ar' ? 'حول' : 'ABOUT')}</h1>
        {loading && (
          <p className="about-paragraph">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        )}
        {error && <p className="about-paragraph">{error}</p>}
        {!loading && !error && body && (
          <div className="about-paragraph">
            <PortableTextRenderer value={body} />
          </div>
        )}
        {!loading && !error && !body && (
          <p className="about-paragraph">{language === 'ar' ? 'لم يتم نشر محتوى صفحة التعريف بعد.' : 'About page content is not published yet.'}</p>
        )}
      </div>
      
      {sections.length > 0 && (
        <div className="team-section">
          {sections.map((section: any, idx: number) => (
            <div key={idx} className="team-member-wrapper">
              {section.heading && <h2 className="team-heading">{language === 'ar' ? (section.headingAr || section.heading) : (section.heading || section.headingAr)}</h2>}
              {section.content && <PortableTextRenderer value={language === 'ar' ? (section.contentAr || section.content) : (section.content || section.contentAr)} />}
            </div>
          ))}
        </div>
      )}

      {team.length > 0 && (
        <div className="team-section">
          <h2 className="team-heading">{language === 'ar' ? 'الفريق' : 'Team'}</h2>
          {team.map((member: any) => (
            <div key={member._id} className="team-member-wrapper">
              <div className={`team-member${member.formerMember ? ' team-member-former' : ''}`}>
                <div className="team-member-info">
                  <div className="team-member-name">{language === 'ar' ? (member.nameAr || member.name) : (member.name || member.nameAr)}</div>
                  {(member.role || member.roleAr) && <div className="team-member-role">{language === 'ar' ? (member.roleAr || member.role) : (member.role || member.roleAr)}</div>}
                  {member.bio && <div className="team-member-bio"><PortableTextRenderer value={language === 'ar' ? (member.bioAr || member.bio) : (member.bio || member.bioAr)} /></div>}
                </div>
              </div>
            </div>
          ))}
          <p className="team-footnote">
            {language === 'ar'
              ? 'نواصل العمل مع شركاء ومتعاونين أوسع إلى جانب هذا الفريق الأساسي.'
              : 'We continue to work with a broader network of partners and collaborators alongside this core team.'}
          </p>
        </div>
      )}
      
      <Footer language={language} />
    </div>
  );
};

export default AboutPage;
