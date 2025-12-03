import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

interface ProjectCardProps {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly year: string;
  readonly image?: any;
  readonly summary: string;
}

export function ProjectCard({ id, title, category, year, image, summary }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  // Mouse position tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 150,
    damping: 20
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(percentX);
    mouseY.set(percentY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  let imageUrl: string | undefined;
  
  if (image && typeof image === 'object') {
    imageUrl = urlFor(image).width(600).height(400).url();
  } else if (typeof image === 'string') {
    imageUrl = image;
  }

  return (
    <Link to={`/projects/${id}`} style={{ textDecoration: 'none' }}>
      <motion.article 
        ref={cardRef}
        className="project-card relative"
        initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 15, filter: "blur(10px)" }}
        whileInView={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ 
          y: -16,
          scale: 1.03,
          transition: { 
            type: "spring",
            stiffness: 300,
            damping: 25
          }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-[#A0695F] via-[#8B5A50] to-[#A0695F] rounded-lg opacity-0 blur-xl -z-10"
          animate={{
            opacity: isHovered ? 0.4 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Image */}
        {imageUrl && (
          <motion.div 
            className="project-image-wrapper relative overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.img
              src={imageUrl}
              alt={title}
              initial={{ scale: 1.3, filter: "brightness(0.7) saturate(0.8)" }}
              whileInView={{ scale: 1, filter: "brightness(1) saturate(1)" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                scale: isHovered ? 1.15 : 1,
                transition: "scale 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
              }}
            />
            
            {/* Image overlay gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Animated shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%", skewX: -20 }}
              animate={{
                x: isHovered ? "200%" : "-100%",
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}

        {/* Metadata */}
        <motion.div 
          className="project-meta"
          style={{
            transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        >
          <motion.span
            whileHover={{ scale: 1.1, color: "#A0695F" }}
            transition={{ duration: 0.2 }}
          >
            {category}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.1, color: "#A0695F" }}
            transition={{ duration: 0.2 }}
          >
            {year}
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="project-title"
          style={{
            transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>

        {/* Summary */}
        {summary && (
          <motion.p 
            style={{ 
              fontSize: 'var(--text-base)', 
              color: 'var(--text-secondary)', 
              lineHeight: 1.6,
              transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
              transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
          >
            {summary}
          </motion.p>
        )}

        {/* Floating particles on hover */}
        {isHovered && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`particle-${i}-${id}`}
                className="absolute w-1 h-1 bg-[#A0695F] rounded-full"
                initial={{ 
                  x: Math.random() * 100 - 50, 
                  y: Math.random() * 100 - 50,
                  opacity: 0 
                }}
                animate={{
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </>
        )}
      </motion.article>
    </Link>
  );
}
