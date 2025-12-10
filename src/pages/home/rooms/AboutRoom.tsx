import { useLanguage } from '../../../contexts/LanguageContext';
import { useRoomAnchor } from '../../../contexts/RoomsContext';
const aboutCopy = {
  en: [
    'Based in Tripoli, Libya, Merath is a transregional collective operating across the Sahara and Mediterranean.',
    'Functioning as both infrastructure builder and art studio, we develop (im)material systems, structures and workshops to circulate knowledge under constraint.',
    'Merath weaves ecological frameworks and archival research into durational exhibitions and performances that bridge resonant contexts across sand and sea.',
  ],
  ar: [
    'تتخذ ميراث من طرابلس، ليبيا، مقراً لها، وهي جماعة عابرة للأقاليم تنشط عبر الصحراء الكبرى والبحر الأبيض المتوسط.',
    'وبصفتنا بانٍ للبنية التحتية واستوديو فني في آن واحد، نطور أنظمة وهياكل وورش عمل (لا) مادية لتداول المعرفة في ظل ظروف القيد.',
    'تنسج ميراث الأطر البيئية والبحث الأرشيفي في معارض وأعمال أدائية متمهلة، تجسر السياقات المتناغمة عبر الرمال والبحر.',
  ],
} as const;
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
