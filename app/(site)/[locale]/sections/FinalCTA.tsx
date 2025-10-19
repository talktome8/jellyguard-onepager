import { useTranslations } from 'next-intl';
import ContactForm from '../components/ContactForm';
import SectionTitle from '../components/SectionTitle';
import TestimonialBar from '../components/TestimonialBar';

export default function FinalCTA() {
  const t = useTranslations('finalCta');

  return (
    <>
      {/* Trust strip */}
      <TestimonialBar />
      
      <section id="contact" className="strip strip-white section">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <SectionTitle 
              kicker="GET STARTED"
              title={t('title')}
              subtitle={t('subtitle')}
              centered
            />
            
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
