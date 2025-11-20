import dynamic from 'next/dynamic';
import ROICalculator from '../components/ROICalculator';
import ComparisonChart from '../components/ComparisonChart';

// Dynamically import 3D component (client-side only)
const Jellyfish3D = dynamic(() => import('../components/Jellyfish3D'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="text-teal">Loading spectacular 3D jellyfish...</div>
    </div>
  )
});

export default function VisualizationsDemo() {
  return (
    <>
      {/* 3D Floating Jellyfish - scrolls with page */}
      <Jellyfish3D />
      
      <div className="relative z-20 bg-white">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy-light to-teal/20 text-white">
          <div className="container-custom text-center">
            <h1 className="text-6xl font-bold mb-6">
              Spectacular Visualizations Demo
            </h1>
            <p className="text-2xl text-sand mb-8">
              Scroll down to see the 3D jellyfish swim through the page!
            </p>
            <p className="text-lg text-sand/80">
              Watch it appear in front and behind sections as you scroll
            </p>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="py-20 bg-navy relative z-10">
          <div className="container-custom">
            <ROICalculator />
          </div>
        </section>

        {/* Comparison Chart Section */}
        <section className="relative z-10">
          <ComparisonChart />
        </section>

        {/* Spacer Section to demonstrate jellyfish layering */}
        <section className="py-32 bg-gradient-to-br from-teal/20 to-navy-light relative z-10">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              3D Jellyfish Animation Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
              <div className="card-glass p-8 rounded-xl">
                <div className="text-5xl mb-4">🌊</div>
                <h3 className="text-xl font-bold text-teal mb-3">Realistic Swimming</h3>
                <p className="text-sand/80">
                  Pulsing bell, flowing tentacles, and natural swimming motion powered by Three.js
                </p>
              </div>
              
              <div className="card-glass p-8 rounded-xl">
                <div className="text-5xl mb-4">📜</div>
                <h3 className="text-xl font-bold text-teal mb-3">Scroll-Linked</h3>
                <p className="text-sand/80">
                  Position changes based on scroll progress, appearing in front and behind sections
                </p>
              </div>
              
              <div className="card-glass p-8 rounded-xl">
                <div className="text-5xl mb-4">🫧</div>
                <h3 className="text-xl font-bold text-teal mb-3">Bubble Lift</h3>
                <p className="text-sand/80">
                  Click the UP button at bottom to ride the jellyfish to the top with animated bubbles!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Another section to show z-index switching */}
        <section className="py-32 bg-sand relative z-10">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold text-navy mb-6">
              Interactive Data Visualizations
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-navy mb-3">ROI Calculator</h3>
                <ul className="text-left text-navy/70 space-y-2">
                  <li>✓ Real-time calculations</li>
                  <li>✓ Animated number counters</li>
                  <li>✓ Based on verified data</li>
                  <li>✓ Interactive sliders</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-5xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-navy mb-3">Comparison Charts</h3>
                <ul className="text-left text-navy/70 space-y-2">
                  <li>✓ Animated bar graphs</li>
                  <li>✓ Multi-metric analysis</li>
                  <li>✓ Color-coded performance</li>
                  <li>✓ Scroll-reveal animation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final section - scroll here to see UP button */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-teal/30 relative z-10">
          <div className="container-custom text-center text-white">
            <h2 className="text-5xl font-bold mb-6">
              Ready to Return to the Top?
            </h2>
            <p className="text-2xl text-sand mb-12">
              Look for the floating button in the bottom-right corner →
            </p>
            <div className="card-glass p-8 rounded-2xl max-w-2xl mx-auto">
              <p className="text-lg text-sand/90 mb-4">
                <strong>Click the UP button</strong> to activate the spectacular bubble animation!
              </p>
              <p className="text-sand/70">
                The jellyfish will rise with animated bubbles and smoothly scroll you back to the top of the page.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
