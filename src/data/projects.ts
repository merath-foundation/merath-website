export interface Project {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  type: {
    en: string;
    ar: string;
  };
  year: string;
  image: string;
  overview: {
    en: string;
    ar: string;
  };
  approach: {
    en: string;
    ar: string;
  };
  outcomes: {
    en: string;
    ar: string;
  };
}

export const projects: Project[] = [
  {
    id: 'oral-histories',
    title: {
      en: 'Oral Histories of the Coast',
      ar: 'التواريخ الشفوية للساحل'
    },
    type: {
      en: 'Documentary Research',
      ar: 'بحث توثيقي'
    },
    year: '2023',
    image: 'https://images.unsplash.com/photo-1674003487359-c9e8532b79e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjBtaWRkbGUlMjBlYXN0fGVufDF8fHx8MTc2Mjk3NjQyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    overview: {
      en: 'A multi-year initiative documenting the lived experiences of coastal communities through recorded interviews, photographs, and material culture. This project captures the evolving relationship between people and place along changing shorelines.',
      ar: 'مبادرة متعددة السنوات لتوثيق التجارب المعيشة للمجتمعات الساحلية من خلال المقابلات المسجلة والصور والثقافة المادية. يوثق هذا المشروع العلاقة المتطورة بين الناس والمكان على طول السواحل المتغيرة.'
    },
    approach: {
      en: 'We employed participatory methods, training community members as co-researchers to gather stories in their own languages and contexts. This approach ensured authenticity while building local capacity for ongoing documentation.',
      ar: 'استخدمنا أساليب تشاركية، حيث قمنا بتدريب أفراد المجتمع كباحثين مشاركين لجمع القصص بلغاتهم وسياقاتهم الخاصة. ضمن هذا النهج الأصالة مع بناء القدرات المحلية للتوثيق المستمر.'
    },
    outcomes: {
      en: 'The archive now includes over 150 recorded interviews, 2,000 digitized photographs, and a traveling exhibition that has been shown in five cities. Materials are accessible through our online portal with multilingual transcriptions.',
      ar: 'يضم الأرشيف الآن أكثر من 150 مقابلة مسجلة و2000 صورة رقمية ومعرضاً متنقلاً عُرض في خمس مدن. المواد متاحة من خلال بوابتنا الإلكترونية مع نصوص متعددة اللغات.'
    }
  },
  {
    id: 'textile-traditions',
    title: {
      en: 'Textile Traditions & Innovation',
      ar: 'تقاليد النسيج والابتكار'
    },
    type: {
      en: 'Material Culture Study',
      ar: 'دراسة الثقافة المادية'
    },
    year: '2022',
    image: 'https://images.unsplash.com/photo-1761516659547-3000a0b1c0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwcGF0dGVybiUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MzA3MjQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    overview: {
      en: 'An exploration of traditional textile practices and their contemporary adaptations, documenting techniques, patterns, and the social contexts of fabric production across three regions.',
      ar: 'استكشاف لممارسات النسيج التقليدية وتكييفاتها المعاصرة، وتوثيق التقنيات والأنماط والسياقات الاجتماعية لإنتاج الأقمشة عبر ثلاث مناطق.'
    },
    approach: {
      en: 'Researchers collaborated with master weavers to document processes through video, photography, and detailed written descriptions. Workshops brought together practitioners from different generations to share knowledge and techniques.',
      ar: 'تعاون الباحثون مع حرفيي النسيج الخبراء لتوثيق العمليات من خلال الفيديو والتصوير والأوصاف الكتابية المفصلة. جمعت ورش العمل بين الممارسين من أجيال مختلفة لتبادل المعرفة والتقنيات.'
    },
    outcomes: {
      en: 'A comprehensive digital archive of textile techniques, a published catalog of regional patterns, and an ongoing mentorship program connecting emerging and established artisans. Several pieces were acquired by national museums.',
      ar: 'أرشيف رقمي شامل لتقنيات النسيج، وكتالوج منشور للأنماط الإقليمية، وبرنامج توجيه مستمر يربط الحرفيين الناشئين والراسخين. حصلت عدة قطع على اهتمام من المتاحف الوطنية.'
    }
  },
  {
    id: 'urban-memory',
    title: {
      en: 'Urban Memory Project',
      ar: 'مشروع الذاكرة الحضرية'
    },
    type: {
      en: 'Urban Ethnography',
      ar: 'إثنوغرافيا حضرية'
    },
    year: '2023',
    image: 'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGNlbnRlciUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjMwNzI0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    overview: {
      en: 'Documenting the transformation of historic neighborhoods through resident narratives, architectural surveys, and ephemeral material culture. The project traces how communities adapt and preserve identity amid urban change.',
      ar: 'توثيق تحول الأحياء التاريخية من خلال روايات السكان والمسوحات المعمارية والثقافة المادية الزائلة. يتتبع المشروع كيف تتكيف المجتمعات وتحافظ على هويتها وسط التغيير الحضري.'
    },
    approach: {
      en: 'Using walking interviews, photo elicitation, and participatory mapping, we created a layered portrait of neighborhood life. Residents identified significant sites and shared memories attached to specific locations.',
      ar: 'باستخدام المقابلات المتنقلة واستخلاص الصور ورسم الخرائط التشاركي، أنشأنا صورة متعددة الطبقات للحياة في الحي. حدد السكان المواقع المهمة وشاركوا الذكريات المرتبطة بأماكن محددة.'
    },
    outcomes: {
      en: 'An interactive digital map featuring 200+ stories, a community-curated exhibition in the neighborhood itself, and policy recommendations submitted to city planners regarding heritage preservation in development projects.',
      ar: 'خريطة رقمية تفاعلية تضم أكثر من 200 قصة، ومعرض منظم من قبل المجتمع في الحي نفسه، وتوصيات سياسية مقدمة لمخططي المدينة بشأن حفظ التراث في مشاريع التطوير.'
    }
  },
  {
    id: 'migration-narratives',
    title: {
      en: 'Migration Narratives',
      ar: 'روايات الهجرة'
    },
    type: {
      en: 'Oral History',
      ar: 'تاريخ شفوي'
    },
    year: '2021',
    image: 'https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjMwMDMzNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    overview: {
      en: 'Recording the experiences of individuals and families who have moved across borders, exploring themes of belonging, loss, adaptation, and the preservation of cultural practices in new contexts.',
      ar: 'تسجيل تجارب الأفراد والعائلات الذين انتقلوا عبر الحدود، واستكشاف موضوعات الانتماء والفقدان والتكيف والحفاظ على الممارسات الثقافية في سياقات جديدة.'
    },
    approach: {
      en: 'Through long-form interviews conducted in multiple languages, we documented personal histories while respecting the sensitive nature of migration experiences. Participants had full control over what was recorded and shared.',
      ar: 'من خلال المقابلات الطويلة التي أجريت بلغات متعددة، وثقنا التواريخ الشخصية مع احترام الطبيعة الحساسة لتجارب الهجرة. كان للمشاركين السيطرة الكاملة على ما تم تسجيله ومشاركته.'
    },
    outcomes: {
      en: 'A collection of 80 recorded life histories, a podcast series highlighting select narratives, and educational materials used in schools to foster understanding of migration experiences and cultural diversity.',
      ar: 'مجموعة من 80 تاريخاً حياتياً مسجلاً، وسلسلة بودكاست تسلط الضوء على روايات مختارة، ومواد تعليمية تُستخدم في المدارس لتعزيز فهم تجارب الهجرة والتنوع الثقافي.'
    }
  },
  {
    id: 'culinary-heritage',
    title: {
      en: 'Culinary Heritage Archive',
      ar: 'أرشيف التراث الطهي'
    },
    type: {
      en: 'Food Culture Study',
      ar: 'دراسة ثقافة الطعام'
    },
    year: '2022',
    image: 'https://images.unsplash.com/photo-1758186174447-282aaf601477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlJTIwYXJ0aWZhY3RzfGVufDF8fHx8MTc2MzAxNDAwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    overview: {
      en: 'Documenting traditional recipes, cooking techniques, and the cultural significance of food practices across communities. The project explores food as a carrier of memory, identity, and intergenerational knowledge.',
      ar: 'توثيق الوصفات التقليدية وتقنيات الطهي والأهمية الثقافية لممارسات الطعام عبر المجتمعات. يستكشف المشروع الطعام كحامل للذاكرة والهوية والمعرفة بين الأجيال.'
    },
    approach: {
      en: 'We filmed cooking sessions with family cooks and professional chefs, documenting not just recipes but the stories, traditions, and social contexts surrounding food preparation and consumption.',
      ar: 'صورنا جلسات الطهي مع طهاة العائلات والطهاة المحترفين، موثقين ليس فقط الوصفات بل القصص والتقاليد والسياقات الاجتماعية المحيطة بإعداد الطعام واستهلاكه.'
    },
    outcomes: {
      en: 'A video archive of 50 recipes, a published cookbook with historical context, and cooking workshops that bring together different generations to share culinary knowledge and maintain food traditions.',
      ar: 'أرشيف فيديو لـ 50 وصفة، وكتاب طبخ منشور مع سياق تاريخي، وورش طهي تجمع أجيالاً مختلفة لتبادل المعرفة الطهية والحفاظ على تقاليد الطعام.'
    }
  },
  {
    id: 'musical-traditions',
    title: {
      en: 'Musical Traditions in Transition',
      ar: 'التقاليد الموسيقية في التحول'
    },
    type: {
      en: 'Ethnomusicology',
      ar: 'إثنوموسيقولوجيا'
    },
    year: '2023',
    image: 'https://images.unsplash.com/photo-1622701893201-9bc9eb616690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNyYWZ0JTIwaGFuZHN8ZW58MXx8fHwxNjMwMDA2OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    overview: {
      en: 'Recording and analyzing traditional musical forms, documenting performance practices, instrument making, and the social functions of music in ceremonial and everyday contexts.',
      ar: 'تسجيل وتحليل الأشكال الموسيقية التقليدية، وتوثيق ممارسات الأداء وصناعة الآلات والوظائف الاجتماعية للموسيقى في السياقات الاحتفالية واليومية.'
    },
    approach: {
      en: 'Through audio and video recording, interviews with musicians, and documentation of instrument construction, we captured both the technical and cultural dimensions of musical traditions.',
      ar: 'من خلال التسجيل الصوتي والمرئي والمقابلات مع الموسيقيين وتوثيق بناء الآلات، التقطنا الأبعاد التقنية والثقافية للتقاليد الموسيقية.'
    },
    outcomes: {
      en: 'A digital archive of performances, an exhibition of traditional instruments, and a series of concerts bringing together master musicians with younger generations learning these traditions.',
      ar: 'أرشيف رقمي للعروض، ومعرض للآلات التقليدية، وسلسلة من الحفلات الموسيقية تجمع بين الموسيقيين الخبراء والأجيال الشابة التي تتعلم هذه التقاليد.'
    }
  },
  {
    id: 'artisan-knowledge',
    title: {
      en: 'Artisan Knowledge Systems',
      ar: 'أنظمة معرفة الحرفيين'
    },
    type: {
      en: 'Craft Documentation',
      ar: 'توثيق الحرف'
    },
    year: '2021',
    image: 'https://images.unsplash.com/photo-1713700743037-ebc94696d157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXZlJTIwZG9jdW1lbnRzJTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NjMwNzI0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    overview: {
      en: 'A comprehensive study of traditional crafts including pottery, metalwork, and woodcarving. The project documents technical skills, design vocabularies, and the transmission of knowledge from masters to apprentices.',
      ar: 'دراسة شاملة للحرف التقليدية بما في ذلك الفخار والمعادن والنحت الخشبي. يوثق المشروع المهارات التقنية ومفردات التصميم ونقل المعرفة من الخبراء إلى المتدربين.'
    },
    approach: {
      en: 'Embedded documentation with artisans over extended periods, capturing the full production cycle from material sourcing to finished objects. Video documentation supplemented by detailed process notes.',
      ar: 'توثيق مدمج مع الحرفيين على مدى فترات طويلة، يلتقط دورة الإنتاج الكاملة من توريد المواد إلى الأشياء النهائية. توثيق بالفيديو مدعوم بملاحظات تفصيلية عن العملية.'
    },
    outcomes: {
      en: 'Video tutorials for key techniques, an online database of design patterns, and apprenticeship programs connecting aspiring craftspeople with master artisans to ensure skills transmission.',
      ar: 'دروس فيديو للتقنيات الرئيسية، وقاعدة بيانات إلكترونية لأنماط التصميم، وبرامج تدريب مهني تربط الحرفيين الطموحين بالخبراء لضمان نقل المهارات.'
    }
  },
  {
    id: 'landscape-memory',
    title: {
      en: 'Landscape & Memory',
      ar: 'المشهد والذاكرة'
    },
    type: {
      en: 'Environmental Humanities',
      ar: 'العلوم الإنسانية البيئية'
    },
    year: '2022',
    image: 'https://images.unsplash.com/photo-1674003487359-c9e8532b79e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjBtaWRkbGUlMjBlYXN0fGVufDF8fHx8MTc2Mjk3NjQyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    overview: {
      en: 'Exploring the relationship between people and their environments through documentation of landscape-based knowledge, traditional ecological practices, and place-based narratives.',
      ar: 'استكشاف العلاقة بين الناس وبيئاتهم من خلال توثيق المعرفة المستندة إلى المشهد والممارسات البيئية التقليدية والروايات المستندة إلى المكان.'
    },
    approach: {
      en: 'Field research combining environmental observation with oral histories, documenting how communities understand, use, and care for their landscapes across seasons and generations.',
      ar: 'بحث ميداني يجمع بين الملاحظة البيئية والتواريخ الشفوية، يوثق كيف تفهم المجتمعات مشاهدها وتستخدمها وتعتني بها عبر المواسم والأجيال.'
    },
    outcomes: {
      en: 'A multimedia archive of landscape narratives, contributions to environmental policy discussions, and educational materials highlighting indigenous and traditional ecological knowledge.',
      ar: 'أرشيف وسائط متعددة لروايات المشهد، ومساهمات في مناقشات السياسة البيئية، ومواد تعليمية تسلط الضوء على المعرفة البيئية الأصلية والتقليدية.'
    }
  },
  {
    id: 'photography-archive',
    title: {
      en: 'Community Photography Archive',
      ar: 'أرشيف التصوير المجتمعي'
    },
    type: {
      en: 'Visual Archive',
      ar: 'أرشيف بصري'
    },
    year: '2023',
    image: 'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGNlbnRlciUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjMwNzI0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    overview: {
      en: 'Collecting, digitizing, and contextualizing family photographs and community images to create a visual history that complements oral narratives and written records.',
      ar: 'جمع ورقمنة وسياق الصور العائلية والصور المجتمعية لإنشاء تاريخ بصري يكمل الروايات الشفوية والسجلات المكتوبة.'
    },
    approach: {
      en: 'Working directly with families to identify and scan photographs, conducting photo elicitation interviews where images serve as prompts for storytelling and memory sharing.',
      ar: 'العمل مباشرة مع العائلات لتحديد ومسح الصور، وإجراء مقابلات استخلاص الصور حيث تعمل الصور كمحفزات لسرد القصص ومشاركة الذكريات.'
    },
    outcomes: {
      en: 'Over 5,000 digitized images with detailed metadata, public exhibitions featuring community-selected photographs, and digital access through our online platform with full privacy protections.',
      ar: 'أكثر من 5000 صورة رقمية مع بيانات وصفية تفصيلية، ومعارض عامة تعرض صوراً مختارة من المجتمع، ووصول رقمي من خلال منصتنا الإلكترونية مع حماية كاملة للخصوصية.'
    }
  }
];
