import { Activity, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CityMap from "@/components/CityMap";
import TrafficDisplay from "@/components/TrafficDisplay";
import WeatherWidget from "@/components/WeatherWidget";
import PredictionPanel from "@/components/PredictionPanel";
import MetricsGrid from "@/components/MetricsGrid";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserAvatar } from "@/components/UserAvatar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden p-4 md:p-6 lg:p-8">
      {/* Animated background */}
      <div className="fixed inset-0 gradient-mesh opacity-20 pointer-events-none -z-10" />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center glow-accent shadow-2xl floating">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-glow bg-clip-text">
                  AetherAi
                </h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Next-Gen AI Traffic & Route Intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                onClick={() => navigate('/traffic-analysis')}
                className="gradient-primary hover:opacity-90 flex items-center gap-2 glow-effect transition-all duration-300 shadow-xl"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">AI Traffic Analysis</span>
                <span className="sm:hidden">AI Analysis</span>
              </Button>
              <UserAvatar />
            </div>
          </div>
          <div className="h-1 w-full gradient-primary rounded-full shadow-lg glow-secondary" />
        </header>

        {/* Metrics Grid */}
        <div className="mb-6 animate-fade-in">
          <MetricsGrid />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Map - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CityMap />
          </div>
          
          {/* Weather Widget */}
          <div className="glass-card rounded-2xl p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <WeatherWidget />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Display */}
          <div className="glass-card rounded-2xl p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <TrafficDisplay />
          </div>
          
          {/* Prediction Panel */}
          <div className="glass-card rounded-2xl p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <PredictionPanel />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-block glass-card px-6 py-3 rounded-full border-primary/20 shadow-lg">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
