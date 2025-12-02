import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  year: string;
  image?: string;
  summary?: string;
}

export function ProjectCard({ id, title, category, year, image, summary }: ProjectCardProps) {
  return (
    <Link to={`/projects/${id}`} style={{ textDecoration: 'none' }}>
      <article className="project-card">
        {/* Image */}
        {image && (
          <div className="project-image-wrapper">
            <img
              src={image}
              alt={title}
            />
          </div>
        )}

        {/* Metadata */}
        <div className="project-meta">
          <span>{category}</span>
          <span>{year}</span>
        </div>

        {/* Title */}
        <h3 className="project-title">{title}</h3>

        {/* Summary */}
        {summary && (
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {summary}
          </p>
        )}
      </article>
    </Link>
  );
}
