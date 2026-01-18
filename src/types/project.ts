export interface Project {
  id: string;
  slug?: string;
  order?: number;
  titleEn?: string;
  titleAr?: string;
  excerptEn?: string;
  excerptAr?: string;
  categoryEn?: string;
  categoryAr?: string;
  bodyEn?: any[] | string;
  bodyAr?: any[] | string;
  imageUrl?: string;
  sourceUrl?: string;
  year?: string | number;
  featured?: boolean;
}
