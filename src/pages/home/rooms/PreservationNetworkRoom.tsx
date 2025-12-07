import { useLanguage } from '../../../contexts/LanguageContext';
import { useRoomAnchor } from '../../../contexts/RoomsContext';

export function PreservationNetworkRoom() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const roomRef = useRoomAnchor('preservationNetwork');

  return (
    <section ref={roomRef} id="room-preservation-network" className="room room--context context-band" aria-labelledby="preservation-network-title">
      <div className="context-band__grid">
        <div className="context-band__column">
          <p className="room__kicker">{isArabic ? 'شبكة الحفظ' : 'Preservation network'}</p>
          <h2 className="context-band__title" id="preservation-network-title">
            {isArabic ? 'استوديوهات متنقلة وجسور رقمية' : 'Mobile studios and digital bridges'}
          </h2>
          <p className="context-band__copy">
            {isArabic
              ? 'من مخيمات اللاجئين إلى أرشيفات المعاهد، تعمل فرق ميراث على مزامنة بروتوكولات الحفظ بحيث تبقى المواد قابلة للتداول عبر المنطقة.'
              : 'From refugee camps to municipal archives, Merath teams synchronise preservation protocols so material can circulate regionally.'}
          </p>
        </div>

        <div className="context-band__column context-band__column--notes">
          <p className="context-band__note">
            {isArabic
              ? 'نستخدم بيانات وصفية ثنائية اللغة وأدوات مفتوحة المصدر كي لا تبقى المعرفة حبيسة الخوادم الأجنبية.'
              : 'We work in bilingual metadata and open tooling so knowledge is not trapped on distant servers.'}
          </p>
          <p className="context-band__note">
            {isArabic
              ? 'الشراكات تمتد من فضاءات فنية مستقلة إلى الجامعات العامة عبر تمويلات صغيرة ومتدرجة.'
              : 'Partnerships stretch from independent art spaces to public universities via small, steady commissions.'}
          </p>
        </div>
      </div>
    </section>
  );
}
