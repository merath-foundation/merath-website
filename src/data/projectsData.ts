// Project data structure with multilingual content and images
export interface Project {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  subtitle: {
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
    subtitle: {
      en: 'Cultural Research and Documentation',
      ar: 'البحث الثقافي والتوثيق'
    },
    shortDescription: {
      en: 'Cultural Research and Documentation',
      ar: 'البحث الثقافي والتوثيق'
    },
    fullDescription: {
      en: 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.\n\nThis project explores the intersection of cultural heritage and contemporary artistic practice, examining how communities preserve and reinterpret shared narratives. Through extensive fieldwork, oral histories, and archival research, we document the living memory of the region, creating pathways for intergenerational dialogue and cultural continuity.\n\nOur methodology combines traditional documentation techniques with participatory approaches, ensuring that the communities themselves remain at the center of how their stories are told and preserved.',
      ar: 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.\n\nيستكشف هذا المشروع تقاطع التراث الثقافي والممارسة الفنية المعاصرة، مع فحص كيفية حفاظ المجتمعات على إعادة تفسير السرديات المشتركة. من خلال العمل الميداني الموسع، والتاريخ الشفوي، والبحث الأرشيفي، نوثق الذاكرة الحية للمنطقة، ونخلق مسارات للحوار بين الأجيال والاستمرارية الثقافية.\n\nتجمع منهجيتنا بين تقنيات التوثيق التقليدية والأساليب التشاركية، مما يضمن بقاء المجتمعات نفسها في مركز كيفية رواية قصصها والحفاظ عليها.'
    },
    image: 'regional-memory.jpg'
  },
  {
    id: 2,
    title: {
      en: 'Cultural Foundation',
      ar: 'الأساس الثقافي'
    },
    subtitle: {
      en: 'Institutional Development',
      ar: 'تطوير المؤسسات'
    },
    shortDescription: {
      en: 'Institutional Development',
      ar: 'تطوير المؤسسات'
    },
    fullDescription: {
      en: 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.\n\nBuilding sustainable frameworks for cultural exchange and knowledge sharing. This initiative focuses on creating equitable platforms where diverse voices can contribute to and benefit from collaborative cultural projects. We work alongside existing cultural institutions and emerging collectives to develop organizational structures that support long-term artistic and research activities.\n\nOur approach emphasizes horizontal governance models, transparent resource allocation, and the development of skills and capacities within communities rather than imposing external frameworks.',
      ar: 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.\n\nبناء إطر عمل مستدامة لتبادل الثقافة وتبادل المعرفة. تركز هذه المبادرة على إنشاء منصات عادلة حيث يمكن للأصوات المتنوعة المساهمة والاستفادة من المشاريع الثقافية التعاونية. نعمل جنبًا إلى جنب مع المؤسسات الثقافية القائمة والجماعات الناشئة لتطوير هياكل تنظيمية تدعم الأنشطة الفنية والبحثية طويلة الأجل.\n\nيؤكد نهجنا على نماذج الحوكمة الأفقية، وتوزيع الموارد الشفاف، وتطوير المهارات والقدرات داخل المجتمعات بدلاً من فرض أطر خارجية.'
    },
    image: 'cultural-foundation.jpg'
  },
  {
    id: 3,
    title: {
      en: 'Border Narratives',
      ar: 'سرديات الحدود'
    },
    subtitle: {
      en: 'Geographic and Conceptual Boundaries',
      ar: 'الحدود الجغرافية والمفاهيمية'
    },
    shortDescription: {
      en: 'Geographic and Conceptual Boundaries',
      ar: 'الحدود الجغرافية والمفاهيمية'
    },
    fullDescription: {
      en: 'Exploring how geographical and conceptual borders shape artistic expression and cultural identity. Through interdisciplinary collaborations, we examine the fluid nature of boundaries and their role in shaping community narratives.\n\nThis project investigates the lived experiences of artists, writers, and cultural practitioners working across multiple territories, often navigating complex relationships between place, identity, and belonging. We document stories of migration, displacement, and resilience, while creating platforms for cross-border collaboration and exchange.\n\nBy bringing together perspectives from different sides of physical and metaphorical borders, we challenge fixed notions of territory and create spaces for more nuanced understandings of regional identity.',
      ar: 'استكشاف كيفية تشكيل الحدود الجغرافية والمفاهيمية للتعبير الفني والهوية الثقافية. من خلال التعاونات متعددة التخصصات، نفحص الطبيعة السائلة للحدود ودورها في تشكيل السرديات المجتمعية.\n\nيبحث هذا المشروع في التجارب المعاشة للفنانين والكتاب والممارسين الثقافيين الذين يعملون عبر أقاليم متعددة، ويتنقلون في كثير من الأحيان في علاقات معقدة بين المكان والهوية والانتماء. نوثق قصص الهجرة والنزوح والصمود، بينما نخلق منصات للتعاون والتبادل عبر الحدود.\n\nمن خلال الجمع بين وجهات النظر من جوانب مختلفة من الحدود المادية والمجازية، نتحدى المفاهيم الثابتة للإقليم ونخلق مساحات لفهم أكثر دقة للهوية الإقليمية.'
    },
    image: 'border-narratives.jpg'
  },
  {
    id: 4,
    title: {
      en: 'Artistic Archives',
      ar: 'الأرشيفات الفنية'
    },
    subtitle: {
      en: 'Digital and Physical Preservation',
      ar: 'الحفظ الرقمي والفيزيائي'
    },
    shortDescription: {
      en: 'Digital and Physical Preservation',
      ar: 'الحفظ الرقمي والفيزيائي'
    },
    fullDescription: {
      en: 'Documenting and preserving contemporary artistic practices through digital and physical archives. This project creates accessible repositories of cultural expression, ensuring that diverse voices are preserved for future generations.\n\nWe work with artists, institutions, and communities to develop archival methodologies that respect cultural protocols while ensuring broad accessibility. Our archives include documentation of performances, exhibitions, oral histories, and ephemeral artistic practices that might otherwise be lost.\n\nThrough digital platforms and physical collections, we create living archives that serve both as historical records and as resources for ongoing artistic research and production.',
      ar: 'توثيق والحفاظ على الممارسات الفنية المعاصرة من خلال الأرشيفات الرقمية والفيزيائية. يقوم هذا المشروع بإنشاء مستودعات متاحة للتعبير الثقافي، مما يضمن الحفاظ على أصوات متنوعة للأجيال القادمة.\n\nنعمل مع الفنانين والمؤسسات والمجتمعات لتطوير منهجيات أرشيفية تحترم البروتوكولات الثقافية مع ضمان إمكانية الوصول الواسعة. تتضمن أرشيفاتنا توثيق العروض والمعارض والتاريخ الشفوي والممارسات الفنية الزائلة التي قد تُفقد بطريقة أخرى.\n\nمن خلال المنصات الرقمية والمجموعات المادية، نخلق أرشيفات حية تعمل كسجلات تاريخية وكموارد للبحث والإنتاج الفني المستمر.'
    },
    image: 'art-archives.jpg'
  },
  {
    id: 5,
    title: {
      en: 'Collaborative Spaces',
      ar: 'المساحات التعاونية'
    },
    subtitle: {
      en: 'Creative Community Infrastructure',
      ar: 'البنية التحتية للمجتمع الإبداعي'
    },
    shortDescription: {
      en: 'Creative Community Infrastructure',
      ar: 'البنية التحتية للمجتمع الإبداعي'
    },
    fullDescription: {
      en: 'Designing and facilitating inclusive spaces for artistic collaboration and community engagement. These spaces serve as platforms for dialogue, experimentation, and collective creative practice across cultural boundaries.\n\nWe develop both physical and virtual environments that support various forms of cultural production, from workshops and residencies to exhibitions and public programs. Our spaces are designed to be accessible, welcoming, and responsive to the needs of diverse artistic communities.\n\nThrough these collaborative environments, we foster networks of mutual support, skill sharing, and collective learning that strengthen the broader cultural ecosystem.',
      ar: 'تصميم وتسهيل مساحات شاملة للتعاون الفني والمشاركة المجتمعية. تعمل هذه المساحات كمنصات للحوار والتجريب والممارسة الإبداعية الجماعية عبر الحدود الثقافية.\n\nنطور بيئات مادية وافتراضية تدعم أشكالًا مختلفة من الإنتاج الثقافي، من ورش العمل والإقامات إلى المعارض والبرامج العامة. تم تصميم مساحاتنا لتكون في متناول الجميع، ومرحبة، ومستجيبة لاحتياجات المجتمعات الفنية المتنوعة.\n\nمن خلال هذه البيئات التعاونية، نعزز شبكات الدعم المتبادل، وتبادل المهارات، والتعلم الجماعي الذي يقوي النظام البيئي الثقافي الأوسع.'
    },
    image: 'collaborative-spaces.jpg'
  },
  {
    id: 6,
    title: {
      en: 'Future Visions',
      ar: 'الرؤى المستقبلية'
    },
    subtitle: {
      en: 'Digital Innovation and Tradition',
      ar: 'الابتكار الرقمي والتقليد'
    },
    shortDescription: {
      en: 'Digital Innovation and Tradition',
      ar: 'الابتكار الرقمي والتقليد'
    },
    fullDescription: {
      en: 'Imagining and prototyping new models for cultural production and knowledge sharing in the digital age. This forward-looking initiative explores how emerging technologies can enhance community engagement while honoring traditional practices.\n\nWe experiment with digital tools, online platforms, and new media to expand the reach and impact of cultural work, while remaining grounded in the values and aesthetics of the communities we serve. Our projects investigate how technology can facilitate connection, collaboration, and creativity across distances.\n\nBy bridging digital innovation with cultural tradition, we work to ensure that technological advancement serves to amplify rather than replace the richness of regional artistic practices.',
      ar: 'تصور وتطوير نماذج جديدة للإنتاج الثقافي وتبادل المعرفة في العصر الرقمي. تستكشف هذه المبادرة الاستشرافية كيفية تحسين التقنيات الناشئة للمشاركة المجتمعية مع احترام الممارسات التقليدية.\n\nنجرب أدوات رقمية ومنصات عبر الإنترنت ووسائط جديدة لتوسيع نطاق وتأثير العمل الثقافي، مع البقاء متجذرين في قيم وجماليات المجتمعات التي نخدمها. تبحث مشاريعنا في كيفية تسهيل التكنولوجيا للاتصال والتعاون والإبداع عبر المسافات.\n\nمن خلال الجمع بين الابتكار الرقمي والتقاليد الثقافية، نعمل على ضمان أن التقدم التكنولوجي يعمل على تضخيم غنى الممارسات الفنية الإقليمية بدلاً من استبدالها.'
    },
    image: 'future-visions.jpg'
  }
];
