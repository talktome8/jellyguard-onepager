import { useTranslations } from 'next-intl';
import SectionTitle from '../components/SectionTitle';

export default function Opening() {
  const t = useTranslations('opening');

  return (
    <section id="opening" className="strip strip-white section">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <SectionTitle 
            kicker="THE CHALLENGE"
            title={t('title')}
            centered
            icon="wave"
          />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            {t('text')}
          </p>
        </div>
      </div>
    </section>
  );
}
