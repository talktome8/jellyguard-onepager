import { useTranslations } from 'next-intl';
import SectionTitle from '../components/SectionTitle';

export default function SiteRequirements() {
  const t = useTranslations('siteRequirements');

  const items = [0, 1, 2, 3];

  return (
    <section className="strip strip-white section">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <SectionTitle 
            kicker="SITE REQUIREMENTS"
            title={t('title')}
            subtitle={t('intro')}
            centered
          />
          
          <div className="card">
            <ul className="space-y-4">
              {items.map((idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-teal rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 text-lg leading-relaxed">{t(`items.${idx}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
