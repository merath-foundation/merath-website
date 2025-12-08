import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useRoomAnchor } from '../../../contexts/RoomsContext';

export function FoundationRoom() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const roomRef = useRoomAnchor('foundation');

  const missionCopy = isArabic
    ? '.ميراث هي جماعة فنية تدير أيضاً مؤسسة ثقافية، تعمل على دعم الفنانين والباحثين والرعاة المدنيين في بيروت وعموم المنطقة لتوثيق الذاكرة الحضرية وتأويلها وتفعيلها من خلال الإقامات الفنية، والبرامج العامة، والأرشيف الحي'
    : 'merath is an art collective who also run cultural foundation that supports artists, researchers, and civic stewards in Beirut and across the region to document, interpret, and activate resources.';

  return (
    <section ref={roomRef} id="room-foundation" className="room room--hero foundation-room" aria-labelledby="foundation-title">
      <div className="foundation-room__hero">
        <div>
          <p className="foundation-room__label">{isArabic ? 'المؤسسة' : 'Foundation'}</p>
          <h1 className="foundation-room__title" id="foundation-title">
            {isArabic ? 'مؤسسة ميراث' : 'merath foundation'}
          </h1>
          <p className="foundation-room__lede">{missionCopy}</p>
          <div className="foundation-room__actions">
            <Link to="/projects" className="btn btn-primary foundation-room__action--primary">
              {isArabic ? 'استكشف البرامج' : 'Explore programs'}
            </Link>
            <Link to="/about" className="btn btn-ghost">
              {isArabic ? 'اقرأ عن الحوكمة' : 'Review governance'}
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
