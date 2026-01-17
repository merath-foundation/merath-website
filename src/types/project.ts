export interface LocalizedString {
  en?: string;
  ar?: string;
}

// Full description can be rich text (Portable Text blocks) or plain strings.
export interface LocalizedRichText {
  en?: any[] | string;
  ar?: any[] | string;
}

export interface Project {
  id: string | number;
  order?: number;
  title: LocalizedString;
  subtitle?: LocalizedString;
  shortDescription?: LocalizedString;
  fullDescription?: LocalizedRichText;
  imageUrl?: string;
  sourceUrl?: string;
}
