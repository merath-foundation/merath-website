import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface TeaserBlockProps {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly link: string;
}

export function TeaserBlock({ title, description, image, link }: Readonly<TeaserBlockProps>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={link}
      className="group block relative overflow-hidden bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ border: '1px solid rgba(0, 0, 0, 0.08)' }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 ease-out grayscale"
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            filter: isHovered ? 'grayscale(0) brightness(0.95)' : 'grayscale(1)'
          }}
        />
        
        {/* Subtle Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.12 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-black"
        />

        {/* Hover Icon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-8 right-8 w-12 h-12 bg-white flex items-center justify-center z-10"
        >
          <ArrowUpRight className="w-6 h-6 text-black" strokeWidth={2.5} />
        </motion.div>

        {/* Minimalist Corner Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 w-20 h-20"
        >
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/60" />
          <div className="absolute bottom-0 left-0 w-[1px] h-full bg-white/60" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8 lg:p-10 bg-white">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <h3 className="font-black uppercase tracking-tight text-xl lg:text-2xl leading-[1.1] text-black">
            {title}
          </h3>
          
          <p className="text-neutral-600 leading-[1.7] text-sm lg:text-base line-clamp-3 font-light">
            {description}
          </p>

          {/* Animated Underline */}
          <motion.div
            className="pt-4"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '60px' : '30px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-[2px] bg-black" />
          </motion.div>
        </motion.div>
      </div>
    </Link>
  );
}
