import { useTranslations } from 'next-intl';
import SectionTitle from '../components/SectionTitle';

export default function CommercialModel() {
  const t = useTranslations('commercialModel');

  return (
    <section className="strip strip-navy section">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle 
            kicker="COMMERCIAL MODEL"
            title={t('title')}
            centered
            showUnderline={false}
            light
          />
          <p className="text-lg md:text-xl leading-relaxed text-white/90">
            {t('text')}
          </p>
        </div>
      </div>
    </section>
  );
}
