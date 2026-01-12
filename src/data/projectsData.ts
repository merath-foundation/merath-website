// Project data structure with multilingual content and images
export interface Project {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  shortDescription: {
    en: string;
    ar: string;
  };
  fullDescription: {
    en: string;
    ar: string;
  };
  image: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: {
      en: 'Regional Memory',
      ar: 'الذاكرة الإقليمية'
    },
    shortDescription: {
      en: 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.',
      ar: 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.'
    },
    fullDescription: {
      en: 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories. This project explores the intersection of cultural heritage and contemporary artistic practice, examining how communities preserve and reinterpret shared narratives.',
      ar: 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ. يستكشف هذا المشروع تقاطع التراث الثقافي والممارسة الفنية المعاصرة، مع فحص كيفية حفاظ المجتمعات على إعادة تفسير السرديات المشتركة.'
    },
    image: ''
  },
  {
    id: 2,
    title: {
      en: 'Cultural Foundation',
      ar: 'الأساس الثقافي'
    },
    shortDescription: {
      en: 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.',
      ar: 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.'
    },
    fullDescription: {
      en: 'Building sustainable frameworks for cultural exchange and knowledge sharing. This initiative focuses on creating equitable platforms where diverse voices can contribute to and benefit from collaborative cultural projects.',
      ar: 'بناء إطر عمل مستدامة لتبادل الثقافة وتبادل المعرفة. تركز هذه المبادرة على إنشاء منصات عادلة حيث يمكن للأصوات المتنوعة المساهمة والاستفادة من المشاريع الثقافية التعاونية.'
    },
    image: ''
  },
  {
    id: 3,
    title: {
      en: 'Border Narratives',
      ar: 'سرديات الحدود'
    },
    shortDescription: {
      en: 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.',
      ar: 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.'
    },
    fullDescription: {
      en: 'Exploring how geographical and conceptual borders shape artistic expression and cultural identity. Through interdisciplinary collaborations, we examine the fluid nature of boundaries and their role in shaping community narratives.',
      ar: 'استكشاف كيفية تشكيل الحدود الجغرافية والمفاهيمية للتعبير الفني والهوية الثقافية. من خلال التعاونات متعددة التخصصات، نفحص الطبيعة السائلة للحدود ودورها في تشكيل السرديات المجتمعية.'
    },
    image: ''
  },
  {
    id: 4,
    title: {
      en: 'Artistic Archives',
      ar: 'الأرشيفات الفنية'
    },
    shortDescription: {
      en: 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.',
      ar: 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.'
    },
    fullDescription: {
      en: 'Documenting and preserving contemporary artistic practices through digital and physical archives. This project creates accessible repositories of cultural expression, ensuring that diverse voices are preserved for future generations.',
      ar: 'توثيق والحفاظ على الممارسات الفنية المعاصرة من خلال الأرشيفات الرقمية والفيزيائية. يقوم هذا المشروع بإنشاء مستودعات متاحة للتعبير الثقافي، مما يضمن الحفاظ على أصوات متنوعة للأجيال القادمة.'
    },
    image: ''
  },
  {
    id: 5,
    title: {
      en: 'Collaborative Spaces',
      ar: 'المساحات التعاونية'
    },
    shortDescription: {
      en: 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.',
      ar: 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.'
    },
    fullDescription: {
      en: 'Designing and facilitating inclusive spaces for artistic collaboration and community engagement. These spaces serve as platforms for dialogue, experimentation, and collective creative practice across cultural boundaries.',
      ar: 'تصميم وتسهيل مساحات شاملة للتعاون الفني والمشاركة المجتمعية. تعمل هذه المساحات كمنصات للحوار والتجريب والممارسة الإبداعية الجماعية عبر الحدود الثقافية.'
    },
    image: ''
  },
  {
    id: 6,
    title: {
      en: 'Future Visions',
      ar: 'الرؤى المستقبلية'
    },
    shortDescription: {
      en: 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.',
      ar: 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.'
    },
    fullDescription: {
      en: 'Imagining and prototyping new models for cultural production and knowledge sharing in the digital age. This forward-looking initiative explores how emerging technologies can enhance community engagement while honoring traditional practices.',
      ar: 'تصور وتطوير نماذج جديدة للإنتاج الثقافي وتبادل المعرفة في العصر الرقمي. تستكشف هذه المبادرة الاستشرافية كيفية تحسين الممارسات التكنولوجية الناشئة المشاركة المجتمعية مع احترام الممارسات التقليدية.'
    },
    image: ''
  }
];
