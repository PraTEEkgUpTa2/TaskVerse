import React, { useState, useEffect } from 'react';

interface FlipDigitProps {
  value: number;
  label: string;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ value, label }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsFlipping(true);
      
      // Update display value halfway through animation
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 150);

      // End animation
      const endTimer = setTimeout(() => {
        setIsFlipping(false);
      }, 300);

      return () => {
        clearTimeout(timer);
        clearTimeout(endTimer);
      };
    }
  }, [value, displayValue]);

  const formatValue = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flip-digit-container">
        <div className="w-28 h-36 md:w-32 md:h-40 lg:w-36 lg:h-44 relative">
          
          {/* Main digit display */}
          <div className={`digit-card ${isFlipping ? 'flipping' : ''}`}>
            <div className="digit-content">
              <span className="text-4xl md:text-5xl lg:text-6xl font-mono font-light text-white tracking-tight">
                {formatValue(displayValue)}
              </span>
            </div>
          </div>

          {/* Center divider line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-900/50 transform -translate-y-0.5 z-20"></div>
          
          {/* Side highlights for 3D effect */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-500/60 via-slate-400/40 to-slate-500/60 rounded-l-2xl"></div>
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-600/60 via-slate-500/40 to-slate-600/60 rounded-r-2xl"></div>
        </div>
      </div>
      
      {/* Label */}
      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

export default FlipDigit;