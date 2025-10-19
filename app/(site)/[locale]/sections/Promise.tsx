import { useTranslations } from 'next-intl';
import SectionTitle from '../components/SectionTitle';
import BubbleField from '../components/BubbleField';

export default function Promise() {
  const t = useTranslations('promise');

  return (
    <section className="strip strip-navy section relative overflow-hidden">
      {/* Bubble field for depth */}
      <BubbleField />
      
      {/* Radial gradient for spotlight effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,163,163,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle 
            kicker="OUR PROMISE"
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
