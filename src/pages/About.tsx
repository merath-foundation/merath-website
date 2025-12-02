export function About() {
  return (
    <div className="about-page">
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4">
              About Merath Cultural Foundation
            </h1>
            <div className="w-16 h-0.5 bg-black/20"></div>
          </div>

          {/* Mission */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">Mission</h2>
            <div className="max-w-3xl">
              <p className="text-lg text-black/70 leading-relaxed">
                Merath Cultural Foundation is dedicated to preserving and celebrating cultural heritage through 
                documentation, community engagement, and innovative presentation. We believe that every community's 
                stories, traditions, and knowledge systems deserve careful preservation and respectful sharing.
              </p>
            </div>
          </div>

          {/* Approach */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">Approach</h2>
            <div className="max-w-3xl">
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                Our work is grounded in collaboration and respect. We partner with communities to ensure that 
                cultural documentation reflects authentic voices and perspectives. Every project begins with 
                listening and builds toward shared goals.
              </p>
              <p className="text-lg text-black/70 leading-relaxed">
                We combine traditional research methods with contemporary digital tools, always prioritizing 
                ethical practices and community benefit over institutional gain.
              </p>
            </div>
          </div>

          {/* Areas of Focus */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">Areas of Focus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div>
                <h3 className="text-xl font-medium text-black mb-3">Oral Histories</h3>
                <p className="text-black/70 leading-relaxed">
                  Recording and preserving community narratives and personal testimonies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-black mb-3">Cultural Practices</h3>
                <p className="text-black/70 leading-relaxed">
                  Documenting traditional crafts, rituals, and knowledge systems.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-black mb-3">Heritage Sites</h3>
                <p className="text-black/70 leading-relaxed">
                  Researching and recording places of cultural and historical significance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-black mb-3">Digital Archives</h3>
                <p className="text-black/70 leading-relaxed">
                  Creating accessible collections that serve communities and researchers.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="bg-white border border-black/10 rounded p-8 md:p-12 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">Contact & Support</h2>
            <p className="text-lg text-black/70 leading-relaxed mb-6">
              We welcome collaboration, partnership inquiries, and community-initiated projects. 
              If you're interested in working with us or supporting our mission, please reach out.
            </p>
            <a 
              href="mailto:info@merath.org" 
              className="inline-flex items-center justify-center px-8 py-3 bg-[#A0695F] text-white font-medium rounded hover:bg-[#8B5A50] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
