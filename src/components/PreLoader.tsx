import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface PreLoaderProps {
  onComplete: () => void;
}

export const PreLoader = ({ onComplete }: PreLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated particle background */}
      <div className="fixed inset-0 gradient-mesh opacity-30 animate-quantum-rotate" />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-primary/30 blur-sm"
          style={{
            width: Math.random() * 8 + 4 + "px",
            height: Math.random() * 8 + 4 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animationDelay: Math.random() * 8 + "s",
            animationDuration: Math.random() * 10 + 8 + "s",
            "--tx": (Math.random() - 0.5) * 200 + "px",
            "--ty": (Math.random() - 0.5) * 200 + "px",
          } as React.CSSProperties}
        />
      ))}

      {/* Central logo and progress */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Glowing logo */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping opacity-30">
            <div className="w-32 h-32 rounded-3xl gradient-primary" />
          </div>
          <div className="relative w-32 h-32 rounded-3xl gradient-primary flex items-center justify-center glow-effect shadow-2xl">
            <Activity className="w-16 h-16 text-white animate-pulse" />
          </div>
        </div>

        {/* Brand name with glow */}
        <div className="text-center">
          <h1 className="text-6xl font-bold text-glow mb-2 animate-fade-in">
            AetherAi
          </h1>
          <p className="text-muted-foreground text-lg animate-fade-in">
            Initializing Intelligence Systems
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 h-2 bg-secondary/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full gradient-primary transition-all duration-300 ease-out glow-secondary"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Data stream effect */}
        <div className="flex gap-1 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-pulse"
              style={{
                height: Math.random() * 40 + 20 + "px",
                animationDelay: i * 0.1 + "s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
