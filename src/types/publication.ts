export type Publication = {
  id: string;
  title: string;
  monogram: string;
  authors: string;
  month?: string;
  year?: string | number;
  tags: string[];
  description: string;
  imageUrl?: string;
  pdfUrl?: string;
  externalUrl?: string;
  notes?: string;
  body?: any[];
};
