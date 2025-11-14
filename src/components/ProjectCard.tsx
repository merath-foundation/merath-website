import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  id: string;
  title: string;
  type: string;
  year: string;
  image: string;
}

export function ProjectCard({ id, title, type, year, image }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${id}`}
      className="group block"
    >
      <div className="aspect-[3/4] overflow-hidden bg-neutral-100 border border-neutral-200 mb-4">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        />
      </div>
      <h3 className="mb-1 group-hover:opacity-60 transition-opacity">
        {title}
      </h3>
      <p className="text-neutral-500 text-sm">
        {type} · {year}
      </p>
    </Link>
  );
}
