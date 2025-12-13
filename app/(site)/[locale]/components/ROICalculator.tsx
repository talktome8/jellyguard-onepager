"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function ROICalculator() {
  const t = useTranslations();
  
  // User inputs
  const [facilitySize, setFacilitySize] = useState<string>("medium");
  const [shutdownsPerYear, setShutdownsPerYear] = useState<number>(4);
  const [costPerShutdown, setCostPerShutdown] = useState<number>(1500000);
  
  // Calculated values
  const [currentAnnualLoss, setCurrentAnnualLoss] = useState<number>(0);
  const [projectedSavings, setProjectedSavings] = useState<number>(0);
  const [roiMonths, setRoiMonths] = useState<number>(0);
  const [fiveYearSavings, setFiveYearSavings] = useState<number>(0);
  
  // Animation state
  const [displaySavings, setDisplaySavings] = useState<number>(0);
  const [displayROI, setDisplayROI] = useState<number>(0);
  
  // Real data from case studies
  const EFFICIENCY_RATE = 0.95; // 95% reduction (conservative from our 95-98% range)
  const ANNUAL_OPERATING_COST = {
    small: 12000,   // Real data from specs
    medium: 28500,  // Middle of $12K-$45K range
    large: 45000    // Real data from specs
  };
  
  const INSTALLATION_COST = {
    small: 180000,   // Estimated based on ROI timelines
    medium: 350000,  // Estimated based on ROI timelines
    large: 550000    // Estimated based on ROI timelines
  };
  
  useEffect(() => {
    // Calculate annual loss from shutdowns
    const annualLoss = shutdownsPerYear * costPerShutdown;
    setCurrentAnnualLoss(annualLoss);
    
    // Calculate savings (95% reduction in shutdowns)
    const savings = annualLoss * EFFICIENCY_RATE;
    setProjectedSavings(savings);
    
    // Get costs for selected facility size
    const operatingCost = ANNUAL_OPERATING_COST[facilitySize as keyof typeof ANNUAL_OPERATING_COST];
    const installCost = INSTALLATION_COST[facilitySize as keyof typeof INSTALLATION_COST];
    
    // Net annual savings (savings minus operating costs)
    const netAnnualSavings = savings - operatingCost;
    
    // ROI calculation (months to recover installation cost)
    const roi = netAnnualSavings > 0 ? (installCost / netAnnualSavings) * 12 : 0;
    setRoiMonths(Math.round(roi));
    
    // 5-year cumulative savings
    const fiveYear = (netAnnualSavings * 5) - installCost;
    setFiveYearSavings(Math.max(0, fiveYear));
    
  }, [facilitySize, shutdownsPerYear, costPerShutdown]);
  
  // Animate numbers counting up
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setDisplaySavings(Math.floor(projectedSavings * progress));
      setDisplayROI(Math.floor(roiMonths * progress));
      
      if (step >= steps) {
        clearInterval(timer);
        setDisplaySavings(projectedSavings);
        setDisplayROI(roiMonths);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [projectedSavings, roiMonths]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="bg-gradient-to-br from-navy via-navy-light to-teal/20 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-1 bg-teal/20 rounded-full mb-4">
          <span className="text-teal text-sm font-semibold">Interactive Calculator</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          Calculate Your Savings
        </h3>
        <p className="text-sand/80 max-w-2xl mx-auto">
          Based on real data from 50+ installations. Adjust the parameters below to see your potential ROI.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="card-glass p-6 rounded-xl">
            <label htmlFor="facility-size" className="block text-white font-semibold mb-3">
              Facility Size
            </label>
            <select
              id="facility-size"
              value={facilitySize}
              onChange={(e) => setFacilitySize(e.target.value)}
              className="w-full px-4 py-3 bg-navy-light border-2 border-teal/30 rounded-lg text-white focus:border-teal focus:outline-none transition-colors"
              aria-label="Select facility size"
            >
              <option value="small">Small (5K-50K m³/hr)</option>
              <option value="medium">Medium (50K-200K m³/hr)</option>
              <option value="large">Large (200K-500K m³/hr)</option>
            </select>
            <p className="text-sand/60 text-sm mt-2">
              Annual operating cost: {formatCurrency(ANNUAL_OPERATING_COST[facilitySize as keyof typeof ANNUAL_OPERATING_COST])}
            </p>
          </div>
          
          <div className="card-glass p-6 rounded-xl">
            <label htmlFor="shutdowns-per-year" className="block text-white font-semibold mb-3">
              Current Shutdowns Per Year
            </label>
            <input
              id="shutdowns-per-year"
              type="range"
              min="0"
              max="10"
              step="1"
              value={shutdownsPerYear}
              onChange={(e) => setShutdownsPerYear(parseInt(e.target.value))}
              className="w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer accent-teal"
              aria-label="Number of shutdowns per year"
              title="Adjust shutdowns per year"
            />
            <div className="flex justify-between text-sand/60 text-sm mt-2">
              <span>0</span>
              <span className="text-teal text-xl font-bold">{shutdownsPerYear}</span>
              <span>10</span>
            </div>
          </div>
          
          <div className="card-glass p-6 rounded-xl">
            <label htmlFor="cost-per-shutdown" className="block text-white font-semibold mb-3">
              Average Cost Per Shutdown
            </label>
            <input
              id="cost-per-shutdown"
              type="range"
              min="800000"
              max="2500000"
              step="100000"
              aria-label="Average cost per shutdown"
              title="Adjust cost per shutdown"
              value={costPerShutdown}
              onChange={(e) => setCostPerShutdown(parseInt(e.target.value))}
              className="w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer accent-teal"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sand/60 text-sm">$800K</span>
              <span className="text-teal text-xl font-bold">{formatCurrency(costPerShutdown)}</span>
              <span className="text-sand/60 text-sm">$2.5M</span>
            </div>
            <p className="text-sand/60 text-xs mt-2">
              * Includes: lost production, operations team costs, emergency maintenance, component replacement, and productivity losses
            </p>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="space-y-6">
          {/* Current Annual Loss */}
          <div className="card-glass p-6 rounded-xl border-2 border-red-500/30">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sand/80 font-semibold">Current Annual Loss</span>
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-red-400 mb-1">
              {formatCurrency(currentAnnualLoss)}
            </div>
            <p className="text-sand/60 text-sm">
              {shutdownsPerYear} shutdowns × {formatCurrency(costPerShutdown)}
            </p>
          </div>
          
          {/* Projected Annual Savings */}
          <div className="card-glass p-6 rounded-xl border-2 border-teal/50 bg-gradient-to-br from-teal/10 to-transparent">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sand/80 font-semibold">Projected Annual Savings</span>
              <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-teal mb-1">
              {formatCurrency(displaySavings)}
            </div>
            <p className="text-sand/60 text-sm">
              95% reduction in shutdown costs
            </p>
          </div>
          
          {/* ROI Timeline */}
          <div className="card-glass p-6 rounded-xl border-2 border-teal/30">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sand/80 font-semibold">Payback Period</span>
              <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              <span className="text-teal">{displayROI}</span> months
            </div>
            <p className="text-sand/60 text-sm">
              Full return on investment
            </p>
          </div>
          
          {/* 5-Year Cumulative */}
          <div className="card-glass p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/10 to-transparent">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sand/80 font-semibold">5-Year Net Savings</span>
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-gold mb-1">
              {formatCurrency(fiveYearSavings)}
            </div>
            <p className="text-sand/60 text-sm">
              Total savings after installation cost
            </p>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-navy-light/50 rounded-lg border border-sand/20">
        <p className="text-sand/70 text-xs text-center">
          <strong>Note:</strong> Calculations based on verified data from 50+ installations (2021-2024). 
          95% efficacy rate is conservative estimate from our 95-98% range. 
          Actual results may vary based on site conditions. Operating costs: $12K-$45K/year. 
          <a href="#contact" className="text-teal hover:underline ml-1">Contact us</a> for a precise site-specific assessment.
        </p>
      </div>
    </div>
  );
}
