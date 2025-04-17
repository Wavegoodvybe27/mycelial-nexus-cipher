
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ConnectionStrengthProps {
  strength: number; // 0 to 100
  className?: string;
  onStrengthChange?: (value: number) => void;
}

const ConnectionStrength: React.FC<ConnectionStrengthProps> = ({
  strength,
  className,
  onStrengthChange
}) => {
  const [isFluctuating, setIsFluctuating] = useState(true);
  const [displayStrength, setDisplayStrength] = useState(strength);

  useEffect(() => {
    if (!isFluctuating) {
      setDisplayStrength(strength);
      return;
    }

    const fluctuationInterval = setInterval(() => {
      // Random fluctuation within ±5 of the actual strength
      const fluctuation = strength + (Math.random() * 10 - 5);
      const constrainedValue = Math.max(0, Math.min(100, fluctuation));
      setDisplayStrength(Math.round(constrainedValue));
    }, 2000);

    return () => clearInterval(fluctuationInterval);
  }, [strength, isFluctuating]);

  // Determine color based on strength
  const getStrengthColor = (value: number) => {
    if (value < 30) return "text-red-500";
    if (value < 70) return "text-yellow-500";
    return "text-emerald-500";
  };

  // Determine description based on strength
  const getConnectionDescription = (value: number) => {
    if (value < 20) return "Critical";
    if (value < 40) return "Unstable";
    if (value < 60) return "Moderate";
    if (value < 80) return "Strong";
    return "Optimal";
  };

  return (
    <Card className={cn("cosmic-border bg-cosmic-base/50 p-4", className)}>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-cosmic-glow">Connection Strength</h3>
          <button
            onClick={() => setIsFluctuating(!isFluctuating)}
            className="text-xs text-cosmic-glow/70 hover:text-cosmic-glow"
          >
            {isFluctuating ? "Lock" : "Unlock"}
          </button>
        </div>

        <div className="relative pt-1">
          <div className="flex items-center justify-between">
            <div>
              <span className={cn(
                "text-xl font-bold",
                getStrengthColor(displayStrength)
              )}>
                {displayStrength}%
              </span>
              <span className="ml-2 text-xs font-medium text-cosmic-glow/70">
                {getConnectionDescription(displayStrength)}
              </span>
            </div>
            <div className={cn(
              "h-2 w-2 rounded-full",
              isFluctuating ? "bg-cosmic-accent animate-pulse" : "bg-cosmic-purple"
            )}></div>
          </div>
          <div className="overflow-hidden h-2 mt-2 text-xs flex rounded-full bg-cosmic-dark">
            <div
              style={{ width: `${displayStrength}%` }}
              className={cn(
                "shadow-none flex flex-col text-center whitespace-nowrap justify-center transition-all duration-500",
                displayStrength < 30 ? "bg-red-500" : 
                displayStrength < 70 ? "bg-yellow-500" : 
                "bg-emerald-500"
              )}
            ></div>
          </div>
        </div>

        {/* Signal indicators */}
        <div className="grid grid-cols-5 gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, index) => {
            const threshold = (index + 1) * 20;
            const active = displayStrength >= threshold - 15; // Start lighting up slightly before threshold
            
            return (
              <div 
                key={index}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  active 
                    ? `bg-cosmic-${index < 2 ? 'purple' : index < 4 ? 'blue' : 'glow'} animate-pulse-slow` 
                    : "bg-cosmic-dark"
                )}
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default ConnectionStrength;
