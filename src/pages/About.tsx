import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TextReveal } from '../components/TextReveal';
import { RevealOnScroll } from '../components/ScrollAnimations';
import { MorphingCard, FloatingElement, PulsingGlow } from '../components/AdvancedAnimations';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);

  return (
    <div className="about-page" ref={containerRef}>
      {/* Animated background gradient */}
      <motion.div 
        className="fixed inset-0 -z-10 opacity-30"
        style={{ 
          y: backgroundY,
          background: "radial-gradient(circle at 50% 50%, #A0695F 0%, transparent 70%)"
        }}
      />
      
      <section className="py-16 md:py-24 px-6">
        <motion.div className="max-w-7xl mx-auto" style={{ opacity }}>
          {/* Page Header */}
          <FloatingElement duration={4}>
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TextReveal delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4">
                  About Merath Cultural Foundation
                </h1>
              </TextReveal>
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-[#A0695F] via-black/20 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              ></motion.div>
            </motion.div>
          </FloatingElement>

          {/* Mission */}
          <RevealOnScroll direction="left" delay={0.2}>
            <PulsingGlow>
              <motion.div 
                className="mb-20 p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-black/5"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 60px rgba(160, 105, 95, 0.15)",
                  transition: { duration: 0.4 }
                }}
              >
                <motion.h2 
                  className="text-3xl md:text-4xl font-light text-black mb-6"
                  whileHover={{ x: 10, transition: { duration: 0.3 } }}
                >
                  Mission
                </motion.h2>
                <div className="max-w-3xl">
                  <TextReveal delay={0.1}>
                    <p className="text-lg text-black/70 leading-relaxed">
                      Merath Cultural Foundation is dedicated to preserving and celebrating cultural heritage through 
                      documentation, community engagement, and innovative presentation. We believe that every community's 
                      stories, traditions, and knowledge systems deserve careful preservation and respectful sharing.
                    </p>
                  </TextReveal>
                </div>
              </motion.div>
            </PulsingGlow>
          </RevealOnScroll>

          {/* Approach */}
          <RevealOnScroll direction="right" delay={0.3}>
            <motion.div 
              className="mb-20 p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-black/5"
              initial={{ rotateY: -10 }}
              whileInView={{ rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 25px 70px rgba(0, 0, 0, 0.12)",
                transition: { duration: 0.4 }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-light text-black mb-6"
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                Approach
              </motion.h2>
              <div className="max-w-3xl space-y-4">
                <TextReveal delay={0.2}>
                  <p className="text-lg text-black/70 leading-relaxed">
                    Our work is grounded in collaboration and respect. We partner with communities to ensure that 
                    cultural documentation reflects authentic voices and perspectives. Every project begins with 
                    listening and builds toward shared goals.
                  </p>
                </TextReveal>
                <TextReveal delay={0.4}>
                  <p className="text-lg text-black/70 leading-relaxed">
                    We combine traditional research methods with contemporary digital tools, always prioritizing 
                    ethical practices and community benefit over institutional gain.
                  </p>
                </TextReveal>
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* Areas of Focus */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-black mb-8"
              whileHover={{ scale: 1.02, x: 10, transition: { duration: 0.3 } }}
            >
              Areas of Focus
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {[
                { title: 'Oral Histories', desc: 'Recording and preserving community narratives and personal testimonies.' },
                { title: 'Cultural Practices', desc: 'Documenting traditional crafts, rituals, and knowledge systems.' },
                { title: 'Heritage Sites', desc: 'Researching and recording places of cultural and historical significance.' },
                { title: 'Digital Archives', desc: 'Creating accessible collections that serve communities and researchers.' }
              ].map((area, index) => (
                <MorphingCard key={area.title} index={index}>
                  <div className="p-6">
                    <FloatingElement duration={3 + index * 0.5} delay={index * 0.2}>
                      <motion.h3 
                        className="text-xl font-medium text-black mb-3"
                        whileHover={{ 
                          scale: 1.05,
                          color: "#A0695F",
                          transition: { duration: 0.3 }
                        }}
                      >
                        {area.title}
                      </motion.h3>
                    </FloatingElement>
                    <TextReveal delay={index * 0.1 + 0.3}>
                      <p className="text-black/70 leading-relaxed">{area.desc}</p>
                    </TextReveal>
                  </div>
                </MorphingCard>
              ))}
            </div>
          </motion.div>

          {/* Contact & Support */}
          <RevealOnScroll direction="up" delay={0.4}>
            <PulsingGlow color="#A0695F">
              <motion.div 
                className="bg-gradient-to-br from-white via-gray-50 to-white border border-black/10 rounded-2xl p-8 md:p-12 max-w-3xl relative overflow-hidden"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  boxShadow: "0 30px 80px rgba(160, 105, 95, 0.25)",
                  transition: { duration: 0.5 }
                }}
              >
                {/* Animated background pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: "radial-gradient(circle, #A0695F 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                  }}
                  animate={{
                    backgroundPosition: ["0px 0px", "24px 24px"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <motion.h2 
                  className="text-3xl md:text-4xl font-light text-black mb-6 relative z-10"
                  whileHover={{ 
                    scale: 1.02,
                    x: 10,
                    transition: { duration: 0.3 }
                  }}
                >
                  Contact & Support
                </motion.h2>
                <TextReveal delay={0.2}>
                  <p className="text-lg text-black/70 leading-relaxed mb-6 relative z-10">
                    We welcome collaboration, partnership inquiries, and community-initiated projects. 
                    If you're interested in working with us or supporting our mission, please reach out.
                  </p>
                </TextReveal>
                <motion.a 
                  href="mailto:info@merath.org" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#A0695F] text-white font-medium rounded-lg hover:bg-[#8B5A50] transition-colors relative z-10"
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: "0 10px 30px rgba(160, 105, 95, 0.4)",
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Get in Touch
                  </motion.span>
                </motion.a>
              </motion.div>
            </PulsingGlow>
          </RevealOnScroll>
        </motion.div>
      </section>
    </div>
  );
}
