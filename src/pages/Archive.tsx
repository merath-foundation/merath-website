export function Archive() {
  return (
    <div className="archive-page">
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4">
              Archive & Exhibition Production
            </h1>
            <div className="w-16 h-0.5 bg-black/20"></div>
          </div>

          {/* Digital Archive Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">Digital Archive</h2>
            <div className="max-w-3xl">
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                Our digital archive preserves cultural materials in accessible formats, ensuring long-term 
                conservation and broad public access. We employ professional archival standards to digitize 
                photographs, documents, recordings, and artifacts.
              </p>
              <p className="text-lg text-black/70 leading-relaxed">
                Each item is carefully catalogued with rich metadata, making our collections searchable and 
                meaningful for researchers, educators, and community members around the world.
              </p>
            </div>
          </div>

          {/* Exhibition Production Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">Exhibition Production</h2>
            <div className="max-w-3xl">
              <p className="text-lg text-black/70 leading-relaxed mb-4">
                We design and produce exhibitions that transform archival materials into immersive cultural 
                experiences. Our exhibitions combine traditional display methods with interactive digital 
                components to engage diverse audiences.
              </p>
              <p className="text-lg text-black/70 leading-relaxed">
                From concept development through installation, we work closely with communities and cultural 
                institutions to create exhibitions that honor heritage while inviting contemporary dialogue.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
