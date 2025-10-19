import { setRequestLocale } from 'next-intl/server';
import Header from './components/Header';
import Footer from './components/Footer';
import TrustStrip from './components/TrustStrip';
import Hero from './sections/Hero';
import Opening from './sections/Opening';
import Promise from './sections/Promise';
import GlobalImpact from './sections/GlobalImpact';
import FourSteps from './sections/FourSteps';
import Differentiators from './sections/Differentiators';
import WhoWeServe from './sections/WhoWeServe';
import SiteRequirements from './sections/SiteRequirements';
import CommercialModel from './sections/CommercialModel';
import SafetyEcology from './sections/SafetyEcology';
import FinalCTA from './sections/FinalCTA';
import WaveDivider from './components/WaveDivider';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <div className="content-layer">
      <Header />
      
      <main>
        <Hero />
        <WaveDivider color="sand" />
        
        <Opening />
        <WaveDivider color="white" flip />
        
        <Promise />
        <WaveDivider color="sand" />
        
        <GlobalImpact />
        <WaveDivider color="sand" flip />
        
        <FourSteps />
        <WaveDivider color="white" />
        
        <Differentiators />
        <WaveDivider color="sand" flip />
        
        <WhoWeServe />
        <WaveDivider color="white" />
        
        <SiteRequirements />
        <WaveDivider color="white" flip />
        
        <CommercialModel />
        <WaveDivider color="sand" />
        
        <SafetyEcology />
        <WaveDivider color="white" flip />
        
        <TrustStrip />
        
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
