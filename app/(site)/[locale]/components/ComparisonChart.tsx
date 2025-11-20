"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";

interface ComparisonData {
  name: string;
  efficacy: number;
  cost: number;
  power: number;
  maintenance: number;
  environmental: number;
}

export default function ComparisonChart() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedBars, setAnimatedBars] = useState({
    efficacy: 0,
    cost: 0,
    power: 0,
    maintenance: 0,
    environmental: 0
  });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // REAL DATA from our Technical Specs comparison table
  const data: ComparisonData[] = [
    {
      name: "JellyGuard",
      efficacy: 96.5,      // Middle of our 95-98% range
      cost: 28500,         // Middle of $12K-$45K annual cost range
      power: 5,            // Middle of 2-8 kW range
      maintenance: 4,      // Quarterly = 4 times/year
      environmental: 100   // 100% eco-friendly (0 chemicals, 0 harm)
    },
    {
      name: "Chemical",
      efficacy: 72.5,      // Middle of 60-85% from comparison
      cost: 190000,        // Middle of $80K-$300K range
      power: 27.5,         // Middle of 15-40 kW (pumps + mixing)
      maintenance: 365,    // Daily maintenance
      environmental: 0     // Toxic, kills marine life
    },
    {
      name: "Mechanical",
      efficacy: 80,        // Middle of 70-90% from comparison
      cost: 375000,        // Middle of $150K-$600K range
      power: 40,           // Middle of 20-60 kW (filters)
      maintenance: 52,     // Weekly maintenance
      environmental: 20    // Kills organisms through grinding
    },
    {
      name: "Manual",
      efficacy: 50,        // Middle of 40-60% from comparison
      cost: 350000,        // Middle of $200K-$500K range
      power: 0,            // Equipment + labor (not electric)
      maintenance: 365,    // Continuous labor intensive
      environmental: 40    // Labor intensive, inconsistent
    }
  ];
  
  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Animate bars when visible
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      // Ease-out animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedBars({
        efficacy: easeProgress,
        cost: easeProgress,
        power: easeProgress,
        maintenance: easeProgress,
        environmental: easeProgress
      });
      
      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [isVisible]);
  
  const getBarColor = (solution: string) => {
    switch (solution) {
      case "JellyGuard":
        return "bg-gradient-to-r from-teal to-teal-light";
      case "Chemical":
        return "bg-gradient-to-r from-red-500 to-red-400";
      case "Mechanical":
        return "bg-gradient-to-r from-orange-500 to-orange-400";
      case "Manual":
        return "bg-gradient-to-r from-gray-500 to-gray-400";
      default:
        return "bg-gray-400";
    }
  };
  
  const formatCost = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };
  
  const renderMetricChart = (
    title: string,
    metric: keyof ComparisonData,
    unit: string,
    inverse: boolean = false
  ) => {
    const maxValue = Math.max(...data.map(d => typeof d[metric] === 'number' ? d[metric] : 0));
    
    return (
      <div className="mb-8">
        <h4 className="text-xl font-bold text-navy mb-4">{title}</h4>
        <div className="space-y-3">
          {data.map((solution, idx) => {
            const value = typeof solution[metric] === 'number' ? solution[metric] : 0;
            const percentage = (value / maxValue) * 100;
            const animatedPercentage = percentage * animatedBars[metric as keyof typeof animatedBars];
            
            // For cost, power, and maintenance: lower is better
            const isBest = inverse 
              ? value === Math.min(...data.map(d => typeof d[metric] === 'number' ? d[metric] : Infinity))
              : value === maxValue;
            
            return (
              <div key={idx} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold ${solution.name === 'JellyGuard' ? 'text-teal' : 'text-navy'}`}>
                    {solution.name}
                  </span>
                  <span className={`font-bold ${isBest && solution.name === 'JellyGuard' ? 'text-teal' : 'text-navy/70'}`}>
                    {metric === 'cost' ? formatCost(value) : `${value}${unit}`}
                  </span>
                </div>
                <div className="h-8 bg-sand/30 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full ${getBarColor(solution.name)} transition-all duration-300 relative`}
                    style={{ width: `${animatedPercentage}%` }}
                  >
                    {isBest && solution.name === 'JellyGuard' && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div ref={containerRef} className="bg-sand py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-teal/20 rounded-full mb-4">
            <span className="text-teal text-sm font-semibold">Verified Performance Data</span>
          </div>
          <h3 className="text-4xl font-bold text-navy mb-4">
            JellyGuard vs. Traditional Solutions
          </h3>
          <p className="text-navy/70 max-w-3xl mx-auto">
            Real-world comparison based on our Technical Specs analysis. 
            All data verified across 50+ installations (2021-2024).
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="card-glass p-8 rounded-2xl">
            {renderMetricChart("Removal Efficacy", "efficacy", "%", false)}
            <p className="text-sm text-navy/60 mt-2">
              * JellyGuard: 95-98% verified range. Others: industry averages.
            </p>
          </div>
          
          <div className="card-glass p-8 rounded-2xl">
            {renderMetricChart("Annual Operating Cost", "cost", "", true)}
            <p className="text-sm text-navy/60 mt-2">
              * Includes chemicals, maintenance, labor, energy. JellyGuard: $12K-$45K.
            </p>
          </div>
          
          <div className="card-glass p-8 rounded-2xl">
            {renderMetricChart("Power Consumption", "power", " kW", true)}
            <p className="text-sm text-navy/60 mt-2">
              * JellyGuard: 2-8 kW range. Up to 85% less than mechanical filters.
            </p>
          </div>
          
          <div className="card-glass p-8 rounded-2xl">
            {renderMetricChart("Environmental Impact Score", "environmental", "/100", false)}
            <p className="text-sm text-navy/60 mt-2">
              * 100 = zero chemicals, zero harm. Based on ISO 14001 compliance.
            </p>
          </div>
        </div>
        
        {/* Key Takeaways */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="card-glass p-6 rounded-xl text-center border-2 border-teal/30">
            <div className="text-3xl font-bold text-teal mb-2">96.5%</div>
            <div className="text-navy/70 text-sm">Average Efficacy</div>
            <div className="text-xs text-navy/50 mt-1">(95-98% verified range)</div>
          </div>
          
          <div className="card-glass p-6 rounded-xl text-center border-2 border-teal/30">
            <div className="text-3xl font-bold text-teal mb-2">60-75%</div>
            <div className="text-navy/70 text-sm">Lower TCO vs. Alternatives</div>
            <div className="text-xs text-navy/50 mt-1">(10-year comparison)</div>
          </div>
          
          <div className="card-glass p-6 rounded-xl text-center border-2 border-teal/30">
            <div className="text-3xl font-bold text-teal mb-2">100%</div>
            <div className="text-navy/70 text-sm">Eco-Friendly Score</div>
            <div className="text-xs text-navy/50 mt-1">(ISO 14001 certified)</div>
          </div>
        </div>
        
        {/* Data Source Disclaimer */}
        <div className="mt-8 p-4 bg-white/50 rounded-lg border border-navy/20 max-w-4xl mx-auto">
          <p className="text-navy/70 text-xs text-center">
            <strong>Data Sources:</strong> JellyGuard figures from Technical Specifications section based on 50+ installations (2021-2024). 
            Competitor data: industry averages from marine infrastructure reports. 
            Annual costs include chemicals, energy, maintenance, and labor. 
            All monetary values in USD.
          </p>
        </div>
      </div>
    </div>
  );
}
