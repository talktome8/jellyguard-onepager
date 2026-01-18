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
          
          {/* 2. THE PROBLEM - Operational Challenge */}
          <OperationalChallenge />
          
          {/* 3. JELLYGUARD POSITIONING - What It Is */}
          <WhatIsJellyGuard />
          
          {/* 4. MARKET CONTEXT - Why This Matters Globally */}
          <MarketContext />
          
          {/* 5. PROJECT STATUS - Transparent and Conservative */}
          <ProjectStatus />
          
          {/* 6. EXPECTED IMPACT - Conditional Only */}
          <ExpectedImpact />
          
          {/* 7. FINAL CTA - Contact Form */}
          <FinalCTA />
        </main>

        <Footer />
        
        {/* Sticky CTA Button */}
        <StickyCtaButton />
      </div>
    </>
  );
}
