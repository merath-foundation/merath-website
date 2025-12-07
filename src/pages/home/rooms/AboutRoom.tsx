import { useLanguage } from '../../../contexts/LanguageContext';
import { useRoomAnchor } from '../../../contexts/RoomsContext';

const aboutCopy = {
  en: [
    'Merath Foundation is an archival studio in Beirut supporting artists, researchers, and civic custodians to document and reactivate urban memory.',
    'We run residencies, care-led research forums, and preservation workshops so collections remain accessible within their communities.',
    'Our team maintains long-term partnerships with municipalities and independent institutions to keep records legible, bilingual, and in-region.',
  ],
  ar: [
    'مؤسسة ميراث هي استوديو أرشيفي في بيروت يدعم الفنانين والباحثين والقيّمين المدنيين لتوثيق الذاكرة الحضرية وتفعيلها.',
    'نُدير إقامات ومنتديات بحث قائمة على الرعاية وورش حفظ لضمان بقاء المجموعات متاحة داخل مجتمعاتها.',
    'يحافظ فريقنا على شراكات طويلة الأمد مع البلديات والمؤسسات المستقلة كي تبقى السجلات مقروءة وثنائية اللغة وضمن المنطقة.',
  ],
};

export function AboutRoom() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const roomRef = useRoomAnchor('about');

  const paragraphs = aboutCopy[isArabic ? 'ar' : 'en'];
  const kicker = isArabic ? 'نبذة' : 'About';
  const heading = isArabic ? 'مهمتنا ورعايتنا' : 'Our mission and care';

  return (
    <section ref={roomRef} id="room-about" className="room about-room" aria-labelledby="about-title">
      <div className="about-room__content">
        <p className="room__kicker">{kicker}</p>
        <h2 id="about-title">{heading}</h2>
        <div className="about-room__text">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
