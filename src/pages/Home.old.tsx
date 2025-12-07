import { useLanguage } from '../contexts/LanguageContext';
import { ProjectCard } from '../components/ProjectCard';
import { useSanity } from '../hooks/useSanity';
import { Link } from 'react-router-dom';
import { LogoSnakeExperience } from '../components/LogoSnakeExperience';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Project {
  _id: string;
  slug: { current: string };
  title: { en: string; ar: string };
  year?: string;
  description?: { en: string; ar: string };
  featuredImage?: any;
}

export function Home() {
  const { language } = useLanguage();
  const { data: projects } = useSanity(
    `*[_type == "project"] | order(publishedAt desc) [0...6]`
  ) as { data: Project[] | null };
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 20);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 20);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="home-page">
      {/* Logo Maze Experience */}
      <LogoSnakeExperience />

      {/* Hero Section - Minimal & Editorial */}
      <section className="hero">
        <div>
          <motion.div 
            className="hero-label"
            initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
            animate={{ 
              opacity: 1, 
              y: 0,
              letterSpacing: "0.2em",
              transition: {
                duration: 1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
          >
            {"CULTURAL FOUNDATION".split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.03 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.6
              }
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            {"Preserving Heritage".split(' ').map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: i === 0 ? '0.3em' : 0 }}
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ 
                  opacity: 1, 
                  rotateX: 0,
                  transition: {
                    delay: 0.8 + i * 0.2,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 1,
                delay: 1.2,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
          >
            Documenting and safeguarding the cultural narratives that define our shared identity and collective memory.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 1.5
              }
            }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(160, 105, 95, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/projects" className="btn-primary">
                Explore Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, x: 10 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {`The Merath Cultural Foundation safeguards cultural narratives through rigorous documentation, community collaboration, and innovative exhibition practices. We believe every story contributes to our shared heritage and deserves to be preserved with care and respect.`.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.02 }}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>
      </motion.section>

      {/* What We Do */}
      <section>
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            What We Do
          </motion.h2>

          <div className="what-we-do-grid">
            {[
              {
                title: 'Research & Documentation',
                text: 'We conduct comprehensive research to document cultural practices, oral histories, and heritage sites with academic rigor and community partnership.',
                delay: 0.1
              },
              {
                title: 'Community Engagement',
                text: 'We work directly with communities to ensure authentic representation and collaborative storytelling that honors lived experiences.',
                delay: 0.2
              },
              {
                title: 'Digital Archiving & Exhibition',
                text: 'We create accessible digital archives and produce immersive exhibitions that bring cultural heritage to life for diverse audiences.',
                delay: 0.3
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  rotateY: -15,
                  scale: 0.9
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  rotateY: 0,
                  scale: 1
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: card.delay,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: card.delay + 0.2, duration: 0.6 }}
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: card.delay + 0.4, duration: 0.8 }}
                >
                  {card.text}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section>
        <div>
          <motion.div 
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2 
              style={{ margin: 0 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              Recent Projects
            </motion.h2>
            <motion.div
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link 
                to="/projects" 
                className="label"
                style={{ textDecoration: 'none', color: 'var(--accent-primary)' }}
              >
                View All Projects →
              </Link>
            </motion.div>
          </motion.div>

          <div className="projects-grid">
            {projects && projects.length > 0 ? (
              projects.map((project: Project) => (
                <ProjectCard
                  key={project._id}
                  id={project.slug.current}
                  title={language === 'en' ? project.title.en : project.title.ar}
                  category={language === 'en' ? 'Project' : 'مشروع'}
                  year={project.year || ''}
                  image={project.featuredImage}
                  summary={language === 'en' ? project.description?.en || '' : project.description?.ar || ''}
                />
              ))
            ) : (
              <p className="text-center text-black/70">
                {language === 'en' ? 'No projects available yet.' : 'لا توجد مشاريع متاحة حتى الآن.'}
              </p>
            )}
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
