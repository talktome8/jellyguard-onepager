import { setRequestLocale } from 'next-intl/server';
import Header from './components/Header';
import Footer from './components/Footer';
import DepthGradient from './components/DepthGradient';
import StickyCtaButton from './components/StickyCtaButton';
import Hero from './sections/Hero';
import Opening from './sections/Opening';
import Promise from './sections/Promise';
import CaseStudies from './sections/CaseStudies';
import FourSteps from './sections/FourSteps';
import TechnicalSpecs from './sections/TechnicalSpecs';
import Differentiators from './sections/Differentiators';
import FAQ from './sections/FAQ';
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
          {/* 1. HERO - Immediate value proposition with compelling stats */}
          <Hero />
          
          {/* 2. PROBLEM - Quantified challenge and market context */}
          <Opening />
          
          {/* 3. SOLUTION - Clear, differentiated technology explanation */}
          <Promise />
          
          {/* 4. PROOF - Real case studies with measurable ROI */}
          <CaseStudies />
          
          {/* 5. HOW IT WORKS - Simple 4-step process visualization */}
          <FourSteps />
          
          {/* 6. TECHNICAL CREDIBILITY - Detailed specs & competitive comparison (Hidden until post-POC) */}
          <div className="hidden">
            <TechnicalSpecs />
          </div>
          
          {/* 7. DIFFERENTIATION - Why JellyGuard wins vs alternatives */}
          <Differentiators />
          
          {/* 8. OBJECTION HANDLING - Comprehensive FAQ (Hidden until post-POC) */}
          <div className="hidden">
            <FAQ />
          </div>
          
          {/* 9. FINAL CTA - High-urgency contact form with clear value */}
          <FinalCTA />
        </main>

        <Footer />
        
        {/* Sticky CTA Button */}
        <StickyCtaButton />
      </div>
    </>
  );
}
