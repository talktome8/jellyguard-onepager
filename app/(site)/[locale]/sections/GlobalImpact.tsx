import { useTranslations } from 'next-intl';
import SectionTitle from '../components/SectionTitle';
import WorldMapOverlay from '../components/WorldMapOverlay';
import WaterCaustics from '../components/WaterCaustics';
import MiniJellyfish from '../components/MiniJellyfish';

export default function GlobalImpact() {
  const t = useTranslations('globalImpact');

  return (
    <section className="strip strip-sand section relative overflow-hidden">
      {/* Water caustics effect */}
      <WaterCaustics />
      
      {/* Mini jellyfish decorations */}
      <MiniJellyfish position="left" size="sm" opacity={0.08} />
      <MiniJellyfish position="right" size="md" opacity={0.1} />
      
      {/* Faint dotted world map overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#1aa3a3" />
            </pattern>
          </defs>
          {/* Rough continent shapes */}
          <ellipse cx="300" cy="200" rx="200" ry="150" fill="url(#dotPattern)" />
          <ellipse cx="600" cy="250" rx="180" ry="120" fill="url(#dotPattern)" />
          <ellipse cx="900" cy="300" rx="220" ry="140" fill="url(#dotPattern)" />
          <ellipse cx="500" cy="450" rx="160" ry="100" fill="url(#dotPattern)" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            kicker="GLOBAL IMPACT"
            title={t('title')}
            subtitle={t('subtitle')}
            centered
            icon="globe"
          />
          
          {/* Three compact stat badges with minimal icons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="group px-6 py-3 card-glass rounded-full text-sm font-semibold text-navy flex items-center gap-2 hover:-translate-y-0.5 transition-transform duration-300">
              <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M3 10h18M3 14h18" />
              </svg>
              <span>Thin-layer capture</span>
            </div>
            <div className="group px-6 py-3 card-glass rounded-full text-sm font-semibold text-navy flex items-center gap-2 hover:-translate-y-0.5 transition-transform duration-300">
              <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No shredding</span>
            </div>
            <div className="group px-6 py-3 card-glass rounded-full text-sm font-semibold text-navy flex items-center gap-2 hover:-translate-y-0.5 transition-transform duration-300">
              <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Low-power</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Left Column */}
            <div className="card-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center text-coral text-sm">!</span>
                The Problem
              </h3>
              <ul className="space-y-4">
                {['left.0', 'left.1', 'left.2'].map((key, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-coral rounded-full mt-2"></span>
                    <span className="text-gray-700">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column */}
            <div className="card-glass bg-teal/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal text-sm">✓</span>
                Our Solution
              </h3>
              <ul className="space-y-4">
                {['right.0', 'right.1', 'right.2'].map((key, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2"></span>
                    <span className="text-gray-700 font-medium">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
