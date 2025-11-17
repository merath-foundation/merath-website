import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const projectData: Record<string, any> = {
  'oral-histories': {
    titleEn: 'Oral Histories of Tripoli',
    titleAr: 'التواريخ الشفوية لطرابلس',
    year: '2024',
    creditsEn: 'Director: Sara Khalil | Research: Ahmed Hassan | Documentation: Layla Mansour',
    creditsAr: 'المخرج: سارة خليل | البحث: أحمد حسن | التوثيق: ليلى منصور',
    bodyEn: 'The Oral Histories of Tripoli project represents a comprehensive effort to capture and preserve the living memory of the city through the voices of its residents. Over the course of eighteen months, our team conducted in-depth interviews with over fifty individuals, ranging from longtime residents in their eighties to young community activists. These conversations reveal the layered history of Tripoli, from personal family stories to collective memories of social and political transformations. The project employs both audio and video documentation, creating an accessible archive that serves researchers, artists, and future generations seeking to understand the city\'s cultural fabric.',
    bodyAr: 'يمثل مشروع التواريخ الشفوية لطرابلس جهدًا شاملاً لالتقاط والحفاظ على الذاكرة الحية للمدينة من خلال أصوات سكانها. على مدار ثمانية عشر شهرًا، أجرى فريقنا مقابلات متعمقة مع أكثر من خمسين فردًا، تتراوح من السكان القدامى في الثمانينيات من العمر إلى الناشطين المجتمعيين الشباب. تكشف هذه المحادثات عن التاريخ المتعدد الطبقات لطرابلس، من قصص العائلات الشخصية إلى الذكريات الجماعية للتحولات الاجتماعية والسياسية. يستخدم المشروع التوثيق الصوتي والمرئي على حد سواء، مما يخلق أرشيفًا يسهل الوصول إليه يخدم الباحثين والفنانين والأجيال المقبلة الذين يسعون لفهم النسيج الثقافي للمدينة.',
    images: 8,
    relatedProjects: ['photography-archive', 'music-heritage', 'culinary-narratives'],
  },
  'souk-restoration': {
    titleEn: 'Souk Restoration Initiative',
    titleAr: 'مبادرة ترميم السوق',
    year: '2023',
    creditsEn: 'Lead Architect: Nadia Hariri | Conservation: Karim Fadel | Community Liaison: Rami Ashour',
    creditsAr: 'المهندس المعماري الرئيسي: نادية حريري | الحفظ: كريم فاضل | الاتصال المجتمعي: رامي عاشور',
    bodyEn: 'The Souk Restoration Initiative emerged from urgent concerns about the deteriorating condition of Tripoli\'s historic market architecture. Working in close collaboration with shopkeepers, artisans, and heritage conservation specialists, we documented the traditional building techniques, decorative elements, and spatial organization of these commercial spaces. The project goes beyond physical restoration, examining the social and economic role of the souk in contemporary urban life. Our research has informed practical conservation strategies while creating educational resources that celebrate the architectural ingenuity embedded in these vernacular structures.',
    bodyAr: 'نشأت مبادرة ترميم السوق من مخاوف عاجلة بشأن الحالة المتدهورة للعمارة التاريخية لسوق طرابلس. بالعمل بالتعاون الوثيق مع أصحاب المحلات والحرفيين ومتخصصي حفظ التراث، وثقنا تقنيات البناء التقليدية والعناصر الزخرفية والتنظيم المكاني لهذه المساحات التجارية. يتجاوز المشروع الترميم المادي، ويفحص الدور الاجتماعي والاقتصادي للسوق في الحياة الحضرية المعاصرة. أبلغ بحثنا استراتيجيات الحفظ العملية بينما أنشأ موارد تعليمية تحتفي بالبراعة المعمارية المتجذرة في هذه الهياكل الشعبية.',
    images: 10,
    relatedProjects: ['textile-traditions', 'oral-histories', 'photography-archive'],
  },
  'textile-traditions': {
    titleEn: 'Textile Traditions',
    titleAr: 'تقاليد النسيج',
    year: '2023',
    creditsEn: 'Curator: Mona Saab | Research: Fatima Al-Makki | Photography: Hassan Yousef',
    creditsAr: 'المنسق: منى صعب | البحث: فاطمة المكي | التصوير: حسن يوسف',
    bodyEn: 'Textile Traditions investigates the complex cultural and economic networks surrounding fabric production in the region. Through detailed documentation of weaving techniques, dye processes, and pattern vocabularies, the project reveals how textile production has served as both livelihood and artistic expression. We worked directly with the few remaining master weavers to record their knowledge and create a visual archive of traditional patterns. The project also examines how global economic changes have impacted local production, and explores possibilities for sustaining these practices in contemporary contexts.',
    bodyAr: 'يبحث مشروع تقاليد النسيج في الشبكات الثقافية والاقتصادية المعقدة المحيطة بإنتاج القماش في المنطقة. من خلال التوثيق التفصيلي لتقنيات النسيج وعمليات الصباغة ومفردات الأنماط، يكشف المشروع كيف خدم إنتاج النسيج كوسيلة للعيش والتعبير الفني على حد سواء. عملنا مباشرة مع النساجين الأساتذة القلائل المتبقين لتسجيل معرفتهم وإنشاء أرشيف بصري للأنماط التقليدية. يفحص المشروع أيضًا كيف أثرت التغييرات الاقتصادية العالمية على الإنتاج المحلي، ويستكشف إمكانيات استدامة هذه الممارسات في السياقات المعاصرة.',
    images: 9,
    relatedProjects: ['souk-restoration', 'culinary-narratives', 'music-heritage'],
  },
  'photography-archive': {
    titleEn: 'Community Photography Archive',
    titleAr: 'أرشيف التصوير المجتمعي',
    year: '2024',
    creditsEn: 'Archive Director: Leila Haddad | Digital Preservation: Omar Khalil | Outreach: Nour Saleh',
    creditsAr: 'مدير الأرشيف: ليلى حداد | الحفظ الرقمي: عمر خليل | التواصل: نور صالح',
    bodyEn: 'The Community Photography Archive initiative invites residents to contribute personal and family photographs to a growing digital collection. These images, spanning from the 1920s to the present day, offer intimate glimpses into domestic life, public celebrations, and everyday moments that formal historical records often overlook. Our team provides digitization services and works with contributors to gather contextual information about each photograph. The archive serves as both a research resource and a community engagement tool, sparking intergenerational conversations about memory, identity, and urban transformation.',
    bodyAr: 'تدعو مبادرة أرشيف التصوير المجتمعي السكان للمساهمة بصور شخصية وعائلية في مجموعة رقمية متنامية. توفر هذه الصور، الممتدة من عشرينيات القرن الماضي حتى الوقت الحاضر، لمحات حميمة عن الحياة المنزلية والاحتفالات العامة واللحظات اليومية التي غالبًا ما تتجاهلها السجلات التاريخية الرسمية. يوفر فريقنا خدمات الرقمنة ويعمل مع المساهمين لجمع المعلومات السياقية حول كل صورة. يعمل الأرشيف كمصدر بحثي وأداة للمشاركة المجتمعية، مما يثير محادثات بين الأجيال حول الذاكرة والهوية والتحول الحضري.',
    images: 8,
    relatedProjects: ['oral-histories', 'souk-restoration', 'textile-traditions'],
  },
  'music-heritage': {
    titleEn: 'Musical Heritage',
    titleAr: 'التراث الموسيقي',
    year: '2022',
    creditsEn: 'Ethnomusicologist: Tariq Mansour | Recording: Samira Khoury | Documentation: Bilal Hassan',
    creditsAr: 'عالم الإثنوموسيقى: طارق منصور | التسجيل: سميرة خوري | التوثيق: بلال حسن',
    bodyEn: 'Musical Heritage focuses on documenting and preserving traditional musical practices that are intrinsic to the region\'s cultural identity. The project records performances, interviews musicians about their training and repertoire, and examines the social contexts in which music-making occurs. From wedding celebrations to religious ceremonies and informal gatherings, music serves as a vital thread connecting past and present. We have created high-quality audio and video recordings, accompanied by detailed annotations, creating a resource for musicians, researchers, and anyone interested in the sonic dimensions of cultural heritage.',
    bodyAr: 'يركز مشروع التراث الموسيقي على توثيق والحفاظ على الممارسات الموسيقية التقليدية الجوهرية للهوية الثقافية للمنطقة. يسجل المشروع العروض، ويجري مقابلات مع الموسيقيين حول تدريبهم ورواياتهم، ويفحص السياقات الاجتماعية التي يحدث فيها صنع الموسيقى. من احتفالات الزفاف إلى الاحتفالات الدينية والتجمعات غير الرسمية، تعمل الموسيقى كخيط حيوي يربط الماضي والحاضر. أنشأنا تسجيلات صوتية ومرئية عالية الجودة، مصحوبة بتعليقات توضيحية مفصلة، مما يخلق موردًا للموسيقيين والباحثين وأي شخص مهتم بالأبعاد الصوتية للتراث الثقافي.',
    images: 8,
    relatedProjects: ['oral-histories', 'textile-traditions', 'culinary-narratives'],
  },
  'culinary-narratives': {
    titleEn: 'Culinary Narratives',
    titleAr: 'السرديات الطهوية',
    year: '2024',
    creditsEn: 'Research Lead: Maya Diab | Food Photography: Zain Saleh | Oral History: Rania Fouad',
    creditsAr: 'قائد البحث: مايا دياب | تصوير الطعام: زين صالح | التاريخ الشفوي: رانيا فؤاد',
    bodyEn: 'Culinary Narratives explores how food practices carry and transmit cultural knowledge across generations. The project documents traditional recipes, cooking techniques, and the social rituals surrounding food preparation and consumption. Through interviews with home cooks, restaurant owners, and food vendors, we uncover the stories embedded in local cuisine—stories of migration, adaptation, celebration, and resilience. The project also examines how economic and environmental changes are reshaping food traditions, creating a crucial record of culinary heritage at a moment of rapid transformation.',
    bodyAr: 'يستكشف مشروع السرديات الطهوية كيف تحمل ممارسات الطعام وتنقل المعرفة الثقافية عبر الأجيال. يوثق المشروع الوصفات التقليدية وتقنيات الطهي والطقوس الاجتماعية المحيطة بإعداد واستهلاك الطعام. من خلال المقابلات مع الطهاة المنزليين وأصحاب المطاعم وبائعي الطعام، نكشف القصص المتجذرة في المطبخ المحلي - قصص الهجرة والتكيف والاحتفال والمرونة. يفحص المشروع أيضًا كيف تعيد التغييرات الاقتصادية والبيئية تشكيل تقاليد الطعام، مما يخلق سجلاً حاسمًا للتراث الطهوي في لحظة التحول السريع.',
    images: 10,
    relatedProjects: ['oral-histories', 'music-heritage', 'textile-traditions'],
  },
};

export function ProjectDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const project = id ? projectData[id] : null;

  if (!project) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p>Project not found</p>
          <Link to="/projects" className="underline mt-4 inline-block">
            {t('project.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 mb-8 hover:opacity-50 transition-opacity"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          {t('project.back')}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-baseline justify-between mb-4">
            <h1 className="eatable-text">
              {language === 'en' ? project.titleEn : project.titleAr}
            </h1>
            <span>{project.year}</span>
          </div>
          <div className="border-t border-black pt-4">
            <p className="opacity-60">
              {t('project.credits')}
            </p>
            <p>
              {language === 'en' ? project.creditsEn : project.creditsAr}
            </p>
          </div>
        </div>

        {/* Body text */}
        <div className="mb-16 leading-relaxed">
          <p>
            {language === 'en' ? project.bodyEn : project.bodyAr}
          </p>
        </div>

        {/* Gallery */}
        <div className="mb-16 space-y-8">
          {Array.from({ length: project.images }).map((_, index) => (
            <div key={index}>
              <div className="aspect-[16/10] bg-gray-100 mb-2" />
              <p className="text-sm opacity-60">
                Image {index + 1} caption
              </p>
            </div>
          ))}
        </div>

        {/* Related Projects */}
        <div>
          <h2 className="eatable-text mb-6">
            {t('project.related')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {project.relatedProjects.map((relatedId: string) => {
              const related = projectData[relatedId];
              return (
                <Link
                  key={relatedId}
                  to={`/projects/${relatedId}`}
                  className="border border-black p-4 hover:bg-black hover:text-white transition-colors"
                >
                  <div className="aspect-[4/3] bg-gray-100 mb-3" />
                  <h3>
                    {language === 'en' ? related.titleEn : related.titleAr}
                  </h3>
                  <span className="text-sm">{related.year}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
