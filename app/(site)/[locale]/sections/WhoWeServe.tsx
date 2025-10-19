import { useTranslations } from 'next-intl';
import SectionTitle from '../components/SectionTitle';

export default function WhoWeServe() {
  const t = useTranslations('whoWeServe');

  return (
    <section className="strip strip-sand section">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <SectionTitle 
            kicker="WHO WE SERVE"
            title={t('title')}
            centered
          />
          
          <div className="card mb-6 hover-lift">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('primary')}
            </p>
          </div>

          <div className="card-soft">
            <p className="text-gray-700 leading-relaxed">
              {t('secondary')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
