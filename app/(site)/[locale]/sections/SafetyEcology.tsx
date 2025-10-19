import { useTranslations } from 'next-intl';
import SectionTitle from '../components/SectionTitle';

export default function SafetyEcology() {
  const t = useTranslations('safetyEcology');

  return (
    <section className="strip strip-sand section">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <SectionTitle 
            kicker="SAFETY & ECOLOGY"
            title={t('title')}
            centered
          />
          
          <div className="card border-2 border-teal/30 bg-white">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
