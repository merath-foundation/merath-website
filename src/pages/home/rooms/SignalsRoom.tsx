import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useRoomAnchor } from '../../../contexts/RoomsContext';

export function SignalsRoom() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const roomRef = useRoomAnchor('signals');

  return (
    <section ref={roomRef} id="room-signals" className="room room--context context-band context-band--contact" aria-labelledby="signals-title">
      <div className="context-band__contact">
        <p className="room__kicker">{isArabic ? 'التراسل' : 'Signals'}</p>
        <h2 className="context-band__title" id="signals-title">
          {isArabic ? 'ارسل خرائطك لنرسمها معًا' : 'Send us your maps; we will plot them together'}
        </h2>
        <p className="context-band__copy">
          {isArabic
            ? 'ابذل إشارة لبدء إقامة، مشاركة مجموعة، أو اختبار واجهة الأرشيف في مدينتك.'
            : 'Signal us to start a residency, share a collection, or test the interface in your city.'}
        </p>
        <div className="context-band__actions">
          <a href="mailto:hello@merath.org" className="btn btn-primary">
            hello@merath.org
          </a>
          <Link to="/about" className="btn btn-ghost">
            {isArabic ? 'اعرف عن الفريق' : 'Meet the team'}
          </Link>
        </div>
      </div>
    </section>
  );
}
