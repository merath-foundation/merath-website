import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly year: string;
  readonly image?: any;
  readonly summary?: string;
}

export function ProjectCard({ id, title, category, year, image, summary }: ProjectCardProps) {
  let imageUrl: string | undefined;
  
  if (image && typeof image === 'object') {
    imageUrl = urlFor(image).width(800).height(600).url();
  } else if (typeof image === 'string') {
    imageUrl = image;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
    >
      <Link 
        to={`/projects/${id}`}
        className="block group focus-ring rounded-lg"
        style={{ textDecoration: 'none' }}
      >
        <article className="h-full flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--color-accent-primary)] hover:shadow-xl">
          {/* Image */}
          {imageUrl && (
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-background-subtle)]">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
              <span className="meta" style={{ color: 'var(--color-accent-primary)' }}>
                {category}
              </span>
              <span className="meta" style={{ color: 'var(--color-text-tertiary)' }}>
                •
              </span>
              <span className="meta" style={{ color: 'var(--color-text-tertiary)' }}>
                {year}
              </span>
            </div>

            {/* Title */}
            <h3 
              className="text-2xl font-medium mb-3 group-hover:text-[var(--color-accent-primary)] transition-colors"
              style={{ 
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--leading-snug)'
              }}
            >
              {title}
            </h3>

            {/* Summary */}
            {summary && (
              <p 
                className="caption line-clamp-3"
                style={{ 
                  color: 'var(--color-text-secondary)',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {summary}
              </p>
            )}

            {/* Read more indicator */}
            <div className="mt-auto pt-4">
              <span 
                className="text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                style={{ color: 'var(--color-accent-primary)' }}
              >
                Read more
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <line x1="4" y1="8" x2="12" y2="8" />
                  <polyline points="8 4 12 8 8 12" />
                </svg>
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
