
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SignalDecoderProps {
  className?: string;
  connectionStrength: number;
  lastTransmissionTime?: Date;
}

interface Pattern {
  id: string;
  strength: number;
  type: "wave" | "particle" | "field" | "quantum";
  color: string;
}

const SignalDecoder: React.FC<SignalDecoderProps> = ({
  className,
  connectionStrength = 50,
  lastTransmissionTime
}) => {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  
  // Generate random patterns based on connection strength
  useEffect(() => {
    if (lastTransmissionTime) {
      setAnalyzing(true);
      
      // Clear old patterns
      setPatterns([]);
      
      // Generate new patterns after a delay
      const timeout = setTimeout(() => {
        const newPatterns: Pattern[] = [];
        const patternCount = Math.floor(connectionStrength / 10) + 2;
        
        const patternTypes = ["wave", "particle", "field", "quantum"] as const;
        const colors = ["#9b87f5", "#8B5CF6", "#0EA5E9", "#D946EF", "#6E59A5"];
        
        for (let i = 0; i < patternCount; i++) {
          newPatterns.push({
            id: `pattern-${i}`,
            strength: Math.floor(Math.random() * 100),
            type: patternTypes[Math.floor(Math.random() * patternTypes.length)],
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
        
        // Sort patterns by strength
        newPatterns.sort((a, b) => b.strength - a.strength);
        
        setPatterns(newPatterns);
        setAnalyzing(false);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [lastTransmissionTime, connectionStrength]);
  
  return (
    <Card className={cn("cosmic-border bg-cosmic-base/50 backdrop-blur-sm overflow-hidden", className)}>
      <div className="p-4 border-b border-cosmic-purple/30">
        <h3 className="text-lg font-semibold text-cosmic-glow">Signal Decoder</h3>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-cosmic-glow/70">Signal Analysis</div>
          <div className="flex items-center gap-2">
            <div 
              className={cn(
                "h-2 w-2 rounded-full",
                analyzing ? "bg-cosmic-accent animate-pulse" : "bg-cosmic-purple"
              )}
            />
            <span className="text-xs text-cosmic-glow/70">
              {analyzing ? "Analyzing..." : "Ready"}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          {analyzing ? (
            // Show analyzer animation
            <div className="relative h-32 w-full overflow-hidden rounded-md bg-cosmic-dark">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-sm text-cosmic-glow/70">Analyzing dark matter patterns...</div>
              </div>
              
              {/* Animated analyzer lines */}
              <div className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute h-px w-full bg-cosmic-purple/30"
                    style={{ 
                      top: `${(i + 1) * 12.5}%`,
                      animation: `analyzerPulse ${1 + Math.random() * 2}s ease-in-out infinite alternate`,
                      opacity: 0.3 + Math.random() * 0.7
                    }}
                  >
                    <div 
                      className="absolute top-0 left-0 h-1 bg-cosmic-accent"
                      style={{ 
                        width: `${10 + Math.random() * 90}%`,
                        animation: `analyzerWidth ${1 + Math.random() * 3}s ease-in-out infinite alternate`
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Show pattern results
            <div className="space-y-2">
              {patterns.length === 0 ? (
                <div className="text-center py-4 text-cosmic-glow/50 italic">
                  No signal patterns detected
                </div>
              ) : (
                patterns.map((pattern) => (
                  <div
                    key={pattern.id}
                    className="p-2 rounded-md bg-cosmic-dark border border-cosmic-purple/20"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-3 w-3 rounded-full" 
                          style={{ backgroundColor: pattern.color }}
                        />
                        <span className="text-sm font-medium capitalize text-cosmic-glow">
                          {pattern.type} Pattern
                        </span>
                      </div>
                      <span className="text-xs text-cosmic-glow/70">
                        {pattern.strength}% intensity
                      </span>
                    </div>
                    
                    <div className="w-full h-2 bg-cosmic-base/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${pattern.strength}%`,
                          backgroundColor: pattern.color
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SignalDecoder;
