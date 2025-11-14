import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TeaserBlockProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export function TeaserBlock({ title, description, image, link }: TeaserBlockProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <Link
      to={link}
      className="group block border border-neutral-200 hover:border-neutral-400 transition-colors"
    >
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="tracking-tight">{title}</h3>
          <ArrowRight 
            className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${
              isRTL ? 'rotate-180' : ''
            }`}
          />
        </div>
        <p className="text-neutral-600 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
