import { useLanguage } from '../contexts/LanguageContext';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';
import { LogoSnakeExperience } from '../components/LogoSnakeExperience';

export function Home() {
  const { language } = useLanguage();

  return (
    <div className="home-page">
      {/* Logo Maze Experience */}
      <LogoSnakeExperience />

      {/* Hero Section - Minimal & Editorial */}
      <section className="hero">
        <div>
          <div className="hero-label">
            CULTURAL FOUNDATION
          </div>
          
          <h1 className="hero-title">
            Preserving Heritage
          </h1>
          
          <p className="hero-subtitle">
            Documenting and safeguarding the cultural narratives that define our shared identity and collective memory.
          </p>
          
          <div>
            <Link to="/projects" className="btn-primary">
              Explore Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section>
        <div>
          <h2>Our Mission</h2>
          <p>
            The Merath Cultural Foundation safeguards cultural narratives through rigorous documentation, 
            community collaboration, and innovative exhibition practices. We believe every story contributes 
            to our shared heritage and deserves to be preserved with care and respect.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section>
        <div>
          <h2>What We Do</h2>

          <div className="what-we-do-grid">
            {/* Card 1 */}
            <div>
              <h3>Research & Documentation</h3>
              <p>
                We conduct comprehensive research to document cultural practices, oral histories, and heritage 
                sites with academic rigor and community partnership.
              </p>
            </div>

            {/* Card 2 */}
            <div>
              <h3>Community Engagement</h3>
              <p>
                We work directly with communities to ensure authentic representation and collaborative 
                storytelling that honors lived experiences.
              </p>
            </div>

            {/* Card 3 */}
            <div>
              <h3>Digital Archiving & Exhibition</h3>
              <p>
                We create accessible digital archives and produce immersive exhibitions that bring cultural 
                heritage to life for diverse audiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
            <h2 style={{ margin: 0 }}>Recent Projects</h2>
            <Link 
              to="/projects" 
              className="label"
              style={{ textDecoration: 'none', color: 'var(--accent-primary)' }}
            >
              View All Projects →
            </Link>
          </div>

          <div className="projects-grid">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title[language]}
                category={project.type[language]}
                year={project.year}
                image={project.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section style={{ textAlign: 'center', paddingTop: 'var(--space-xxl)', paddingBottom: 'var(--space-xxl)' }}>
        <div>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 300, marginBottom: 'var(--space-lg)' }}>
            Bridging past and present through cultural preservation
          </h2>
          
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/about" className="btn-primary">
              Learn More
            </Link>
            
            <Link to="/projects" className="btn-secondary">
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
