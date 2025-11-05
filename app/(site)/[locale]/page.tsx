import { setRequestLocale } from 'next-intl/server';
import Header from './components/Header';
import Footer from './components/Footer';
import TrustStrip from './components/TrustStrip';
import FloatingJellyfish from './components/FloatingJellyfish';
import DepthGradient from './components/DepthGradient';
import StickyCtaButton from './components/StickyCtaButton';
import Hero from './sections/Hero';
import Opening from './sections/Opening';
import Promise from './sections/Promise';
import CaseStudies from './sections/CaseStudies';
import FourSteps from './sections/FourSteps';
import TechnicalSpecs from './sections/TechnicalSpecs';
import Differentiators from './sections/Differentiators';
import CommercialModel from './sections/CommercialModel';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';
import WaveDivider from './components/WaveDivider';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <>
      {/* Atmospheric background effects */}
      <FloatingJellyfish />
      <DepthGradient />
      
      <div className="content-layer">
        <Header />
        
        <main>
          {/* 1. HERO - Value proposition with stats */}
          <Hero />
          <WaveDivider color="sand" />
          
          {/* 2. PROBLEM - The challenge (jellyfish impact) */}
          <Opening />
          <WaveDivider color="white" flip />
          
          {/* 3. SOLUTION - Our technology */}
          <Promise />
          <WaveDivider color="white" />
          
          {/* 4. PROOF - Case studies with real results (NEW - High Impact) */}
          <CaseStudies />
          <WaveDivider color="sand" />
          
          {/* 5. HOW IT WORKS - 4-step process */}
          <FourSteps />
          <WaveDivider color="white" />
          
          {/* 6. TECHNICAL CREDIBILITY - Specs & comparison (NEW - Technical buyers) */}
          <TechnicalSpecs />
          <WaveDivider color="sand" flip />
          
          {/* 7. DIFFERENTIATION - Why choose us */}
          <Differentiators />
          <WaveDivider color="white" />
          
          {/* 8. COMMERCIAL - Pricing & deployment options */}
          <CommercialModel />
          <WaveDivider color="sand" flip />
          
          {/* 9. OBJECTION HANDLING - FAQ (NEW - Reduce friction) */}
          <FAQ />
          <WaveDivider color="white" />
          
          {/* 10. TRUST - Certifications */}
          <TrustStrip />
          
          {/* 11. CTA - Contact form */}
          <FinalCTA />
        </main>

        <Footer />
        
        {/* Sticky CTA Button */}
        <StickyCtaButton />
      </div>
    </>
  );
}
