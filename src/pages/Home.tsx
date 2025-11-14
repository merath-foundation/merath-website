import { PageTransition } from '../components/PageTransition';
import { TeaserBlock } from '../components/TeaserBlock';
import { useLanguage } from '../contexts/LanguageContext';

export function Home() {
  const { t } = useLanguage();

  return (
    <PageTransition>
      {/* Full-screen landing statement */}
      <section className="min-h-screen flex items-center justify-center px-8 border-b border-neutral-200">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="leading-tight">
            {t('home.statement')}
          </h1>
        </div>
      </section>

      {/* Three teaser blocks */}
      <section className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeaserBlock
            title={t('home.projects.title')}
            description={t('home.projects.description')}
            image="https://images.unsplash.com/photo-1758186174447-282aaf601477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlJTIwYXJ0aWZhY3RzfGVufDF8fHx8MTc2MzAxNDAwOXww&ixlib=rb-4.1.0&q=80&w=1080"
            link="/projects"
          />
          <TeaserBlock
            title={t('home.archive.title')}
            description={t('home.archive.description')}
            image="https://images.unsplash.com/photo-1713700743037-ebc94696d157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXZlJTIwZG9jdW1lbnRzJTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NjMwNzI0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            link="/archive"
          />
          <TeaserBlock
            title={t('home.about.title')}
            description={t('home.about.description')}
            image="https://images.unsplash.com/photo-1622701893201-9bc9eb616690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNyYWZ0JTIwaGFuZHN8ZW58MXx8fHwxNjMwMDA2OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
            link="/about"
          />
        </div>
      </section>
    </PageTransition>
  );
}
