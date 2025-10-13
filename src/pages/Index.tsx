import { Activity, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CityMap from "@/components/CityMap";
import TrafficDisplay from "@/components/TrafficDisplay";
import WeatherWidget from "@/components/WeatherWidget";
import PredictionPanel from "@/components/PredictionPanel";
import MetricsGrid from "@/components/MetricsGrid";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-effect">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-glow">AetherAi</h1>
                <p className="text-muted-foreground">AI-Powered Traffic & Route Intelligence</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/traffic-analysis')}
              className="bg-gradient-primary hover:opacity-90 flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              AI Traffic Analysis
            </Button>
          </div>
          <div className="h-1 w-full bg-gradient-primary rounded-full opacity-30" />
        </header>

        {/* Metrics Grid */}
        <div className="mb-6">
          <MetricsGrid />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Map - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <CityMap />
          </div>
          
          {/* Weather Widget */}
          <div>
            <WeatherWidget />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Display */}
          <div>
            <TrafficDisplay />
          </div>
          
          {/* Prediction Panel */}
          <div>
            <PredictionPanel />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
