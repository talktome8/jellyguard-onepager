import { setRequestLocale } from 'next-intl/server';
import Header from './components/Header';
import Footer from './components/Footer';
import DepthGradient from './components/DepthGradient';
import StickyCtaButton from './components/StickyCtaButton';
import Hero from './sections/Hero';
import ProblemSolution from './sections/ProblemSolution';
import FourSteps from './sections/FourSteps';
import CircularEconomy from './sections/CircularEconomy';
import Differentiators from './sections/Differentiators';
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
          
          {/* 2. PROBLEM → SOLUTION - Compact problem statement and solution */}
          <ProblemSolution />
          
          {/* 3. HOW IT WORKS - Simple 4-step process visualization */}
          <FourSteps />
          
          {/* 4. CIRCULAR ECONOMY - Green tech, blue economy, biomass valorization */}
          <CircularEconomy />
          
          {/* 5. DIFFERENTIATION - Why JellyGuard wins vs alternatives */}
          <Differentiators />
          
          {/* 6. FINAL CTA - High-urgency contact form with clear value */}
          <FinalCTA />
        </main>

        <Footer />
        
        {/* Sticky CTA Button */}
        <StickyCtaButton />
      </div>
    </>
  );
}
