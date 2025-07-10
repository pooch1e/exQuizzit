import { ReactNode } from 'react';

interface SpaceBackgroundProps {
  children: ReactNode;
  className?: string;
}

export default function SpaceBackground({ children, className = '' }: SpaceBackgroundProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden ${className}`}>
      {/* Animated space background elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Original stars - Enhanced */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse shadow-white shadow-sm"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000 shadow-blue-200 shadow-sm"></div>
        <div className="absolute top-32 left-1/3 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-2000 shadow-purple-200 shadow-sm"></div>
        <div className="absolute top-40 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-3000 shadow-white shadow-sm"></div>
        <div className="absolute top-60 left-20 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-500 shadow-blue-200 shadow-sm"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-1500 shadow-purple-200 shadow-sm"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-2500 shadow-white shadow-sm"></div>
        <div className="absolute bottom-40 right-1/4 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-700 shadow-blue-200 shadow-sm"></div>
        <div className="absolute top-72 right-1/2 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-4000 shadow-purple-200 shadow-sm"></div>
        <div className="absolute bottom-60 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse delay-3500 shadow-white shadow-sm"></div>
        
        {/* Additional small stars - Enhanced */}
        <div className="absolute top-16 left-1/2 w-1 h-1 bg-cyan-100 rounded-full animate-pulse delay-800 shadow-cyan-100 shadow-sm"></div>
        <div className="absolute top-28 right-10 w-1 h-1 bg-white rounded-full animate-pulse delay-1200 shadow-white shadow-sm"></div>
        <div className="absolute top-52 left-1/4 w-1 h-1 bg-blue-100 rounded-full animate-pulse delay-600 shadow-blue-100 shadow-sm"></div>
        <div className="absolute top-80 right-2/3 w-1 h-1 bg-purple-100 rounded-full animate-pulse delay-2200 shadow-purple-100 shadow-sm"></div>
        <div className="absolute bottom-28 left-1/3 w-1 h-1 bg-cyan-100 rounded-full animate-pulse delay-1800 shadow-cyan-100 shadow-sm"></div>
        <div className="absolute bottom-52 right-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-900 shadow-white shadow-sm"></div>
        <div className="absolute bottom-72 left-10 w-1 h-1 bg-blue-100 rounded-full animate-pulse delay-2800 shadow-blue-100 shadow-sm"></div>
        <div className="absolute top-36 left-2/3 w-1 h-1 bg-purple-100 rounded-full animate-pulse delay-400 shadow-purple-100 shadow-sm"></div>
        <div className="absolute bottom-16 left-1/2 w-1 h-1 bg-cyan-100 rounded-full animate-pulse delay-3200 shadow-cyan-100 shadow-sm"></div>
        <div className="absolute top-44 left-16 w-1 h-1 bg-white rounded-full animate-pulse delay-1600 shadow-white shadow-sm"></div>
        
        {/* Medium-sized stars - Enhanced */}
        <div className="absolute top-24 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2600 shadow-white shadow-md"></div>
        <div className="absolute top-56 left-12 w-1.5 h-1.5 bg-blue-50 rounded-full animate-pulse delay-1400 shadow-blue-50 shadow-md"></div>
        <div className="absolute bottom-36 right-20 w-1.5 h-1.5 bg-purple-50 rounded-full animate-pulse delay-3600 shadow-purple-50 shadow-md"></div>
        <div className="absolute bottom-64 left-1/2 w-1.5 h-1.5 bg-cyan-50 rounded-full animate-pulse delay-800 shadow-cyan-50 shadow-md"></div>
        <div className="absolute top-68 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2400 shadow-white shadow-md"></div>
        
        {/* Tiny scattered stars - Enhanced */}
        <div className="absolute top-14 left-1/5 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300 shadow-white shadow-sm"></div>
        <div className="absolute top-26 right-1/5 w-0.5 h-0.5 bg-blue-100 rounded-full animate-pulse delay-1900 shadow-blue-100 shadow-sm"></div>
        <div className="absolute top-48 left-3/4 w-0.5 h-0.5 bg-purple-100 rounded-full animate-pulse delay-1100 shadow-purple-100 shadow-sm"></div>
        <div className="absolute bottom-24 right-1/3 w-0.5 h-0.5 bg-cyan-100 rounded-full animate-pulse delay-2900 shadow-cyan-100 shadow-sm"></div>
        <div className="absolute bottom-48 left-1/6 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-700 shadow-white shadow-sm"></div>
        <div className="absolute top-64 left-3/5 w-0.5 h-0.5 bg-blue-100 rounded-full animate-pulse delay-3300 shadow-blue-100 shadow-sm"></div>
        <div className="absolute bottom-80 right-2/5 w-0.5 h-0.5 bg-purple-100 rounded-full animate-pulse delay-1300 shadow-purple-100 shadow-sm"></div>
        <div className="absolute top-84 right-1/6 w-0.5 h-0.5 bg-cyan-100 rounded-full animate-pulse delay-2100 shadow-cyan-100 shadow-sm"></div>
        
        {/* Extra constellation of tiny stars */}
        <div className="absolute top-12 left-1/6 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-pulse delay-250 shadow-yellow-200 shadow-sm"></div>
        <div className="absolute top-18 left-1/5 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-450 shadow-white shadow-sm"></div>
        <div className="absolute top-22 left-1/4 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse delay-650 shadow-blue-200 shadow-sm"></div>
        <div className="absolute top-30 right-1/6 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-850 shadow-purple-200 shadow-sm"></div>
        <div className="absolute top-34 right-1/5 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-pulse delay-1050 shadow-cyan-200 shadow-sm"></div>
        <div className="absolute top-38 right-1/4 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-pulse delay-1250 shadow-yellow-200 shadow-sm"></div>
        
        {/* More scattered medium stars */}
        <div className="absolute top-50 left-3/4 w-1 h-1 bg-yellow-100 rounded-full animate-pulse delay-1700 shadow-yellow-100 shadow-sm"></div>
        <div className="absolute top-66 left-1/6 w-1 h-1 bg-white rounded-full animate-pulse delay-1950 shadow-white shadow-sm"></div>
        <div className="absolute bottom-44 left-3/4 w-1 h-1 bg-blue-100 rounded-full animate-pulse delay-2150 shadow-blue-100 shadow-sm"></div>
        <div className="absolute bottom-56 right-1/6 w-1 h-1 bg-purple-100 rounded-full animate-pulse delay-2350 shadow-purple-100 shadow-sm"></div>
        <div className="absolute bottom-68 left-1/5 w-1 h-1 bg-cyan-100 rounded-full animate-pulse delay-2550 shadow-cyan-100 shadow-sm"></div>
        
        {/* Large bright stars for focal points */}
        <div className="absolute top-30 left-1/2 w-2 h-2 bg-white rounded-full animate-pulse delay-3000 shadow-white shadow-lg"></div>
        <div className="absolute bottom-30 right-1/2 w-2 h-2 bg-blue-50 rounded-full animate-pulse delay-3400 shadow-blue-50 shadow-lg"></div>
        <div className="absolute top-76 left-1/4 w-2 h-2 bg-purple-50 rounded-full animate-pulse delay-3800 shadow-purple-50 shadow-lg"></div>
        
        {/* Dense cluster of tiny stars */}
        <div className="absolute top-58 right-1/5 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-100 shadow-white shadow-sm"></div>
        <div className="absolute top-62 right-1/6 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse delay-350 shadow-blue-200 shadow-sm"></div>
        <div className="absolute top-66 right-1/7 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-550 shadow-purple-200 shadow-sm"></div>
        <div className="absolute top-70 right-1/8 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-pulse delay-750 shadow-cyan-200 shadow-sm"></div>
        <div className="absolute top-74 right-1/9 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-pulse delay-950 shadow-yellow-200 shadow-sm"></div>
        
        {/* Final scattered stars */}
        <div className="absolute bottom-12 left-3/5 w-1 h-1 bg-white rounded-full animate-pulse delay-4200 shadow-white shadow-sm"></div>
        <div className="absolute bottom-18 left-2/5 w-1 h-1 bg-blue-100 rounded-full animate-pulse delay-4400 shadow-blue-100 shadow-sm"></div>
        <div className="absolute bottom-26 left-4/5 w-1 h-1 bg-purple-100 rounded-full animate-pulse delay-4600 shadow-purple-100 shadow-sm"></div>
        <div className="absolute top-8 right-3/5 w-1 h-1 bg-cyan-100 rounded-full animate-pulse delay-4800 shadow-cyan-100 shadow-sm"></div>
        <div className="absolute top-6 right-2/5 w-1 h-1 bg-yellow-100 rounded-full animate-pulse delay-5000 shadow-yellow-100 shadow-sm"></div>
      </div>
      
      {/* Content wrapper with z-index to appear above background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
