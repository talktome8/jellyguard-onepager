import { setRequestLocale } from 'next-intl/server';
import Header from './components/Header';
import Footer from './components/Footer';
import DepthGradient from './components/DepthGradient';
import StickyCtaButton from './components/StickyCtaButton';
import Hero from './sections/Hero';
import OperationalChallenge from './sections/OperationalChallenge';
import WhatIsJellyGuard from './sections/WhatIsJellyGuard';
import MarketContext from './sections/MarketContext';
import ProjectStatus from './sections/ProjectStatus';
import ExpectedImpact from './sections/ExpectedImpact';
import BiomassHandling from './sections/BiomassHandling';
import FinalCTA from './sections/FinalCTA';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <>
      {/* Atmospheric background effects */}
      <DepthGradient />
      
      <div className="content-layer">
        <Header />
        
        <main>
          {/* 1. HERO - Immediate value proposition */}
          <Hero />
          
          {/* 2. PROBLEM FRAMING - Structural gap in intake protection */}
          <OperationalChallenge />
          
          {/* 3. JELLYGUARD POSITIONING - A preventive layer */}
          <WhatIsJellyGuard />
          
          {/* 4. MARKET CONTEXT - Why This Matters Globally */}
          <MarketContext />
          
          {/* 5. PROJECT STATUS - Transparent and Conservative */}
          <ProjectStatus />
          
          {/* 6. EVALUATION INDICATORS - KPI language */}
          <ExpectedImpact />
          
          {/* 7. BIOMASS HANDLING - Scope clarification */}
          <BiomassHandling />
          
          {/* 8. FINAL CTA - Contact Form */}
          <FinalCTA />
        </main>

        <Footer />
        
        {/* Sticky CTA Button */}
        <StickyCtaButton />
      </div>
    </>
  );
}
