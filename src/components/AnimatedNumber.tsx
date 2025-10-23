import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}

export const AnimatedNumber = ({ value, decimals = 0, suffix = "", className = "" }: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayValue === value) return;
    
    setIsAnimating(true);
    const startValue = displayValue;
    const endValue = value;
    const duration = 800; // ms
    const steps = 30;
    const stepDuration = duration / steps;
    const increment = (endValue - startValue) / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(endValue);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setDisplayValue(startValue + (increment * currentStep));
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span 
      className={`${className} ${isAnimating ? 'animate-pulse text-primary' : ''} transition-all duration-300`}
    >
      {displayValue.toFixed(decimals)}{suffix}
    </span>
  );
};
