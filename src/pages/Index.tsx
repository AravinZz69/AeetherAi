import { useState } from "react";
import { Activity, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CityMap from "@/components/CityMap";
import TrafficDisplay from "@/components/TrafficDisplay";
import WeatherWidget from "@/components/WeatherWidget";
import PredictionPanel from "@/components/PredictionPanel";
import MetricsGrid from "@/components/MetricsGrid";
import AccidentProneAreas from "@/components/AccidentProneAreas";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserAvatar } from "@/components/UserAvatar";
import { PreLoader } from "@/components/PreLoader";
// admin access button removed per request
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [showPreLoader, setShowPreLoader] = useState(true);
  // admin access hidden
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [locationData, setLocationData] = useState<any>(null);

  const handleLocationFetch = async (latitude: number, longitude: number) => {
    setIsAnalyzing(true);
    toast.info(`Analyzing location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-location', {
        body: { latitude, longitude }
      });

      if (error) throw error;

      if (data?.success && data?.data) {
        setLocationData(data.data);
        toast.success(`Analysis complete for ${data.data.locationName}`);
      } else {
        throw new Error('Invalid response from analysis');
      }
    } catch (error: any) {
      console.error('Error analyzing location:', error);
      toast.error(error.message || 'Failed to analyze location');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (showPreLoader) {
    return <PreLoader onComplete={() => setShowPreLoader(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Animated background */}
      <div className="fixed inset-0 gradient-mesh opacity-20 pointer-events-none -z-10" />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Mission Statement Hero */}
        <div className="mb-6 sm:mb-8 md:mb-12 text-center animate-fade-in">
          <div className="inline-block mb-4 md:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl gradient-primary flex items-center justify-center glow-accent shadow-2xl floating mx-auto">
              <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-glow mb-3 sm:mb-4">
            AetherAi
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            The single source of truth for consortium members, delivering real-time insights and predictive analytics to optimize urban mobility and drive informed decision-making.
          </p>
          <div className="h-1 w-24 sm:w-32 gradient-primary rounded-full shadow-lg glow-secondary mx-auto" />
        </div>

        {/* Header */}
        <header className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Live Dashboard
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                  Real-time traffic intelligence & predictions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto">
              <ThemeToggle />
              {/* Admin Portal button hidden */}
              <Button 
                onClick={() => navigate('/traffic-analysis')}
                size="sm"
                className="gradient-primary hover:opacity-90 flex items-center gap-1 sm:gap-2 glow-effect transition-all duration-300 shadow-xl whitespace-nowrap"
              >
                <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline text-xs sm:text-sm">AI Traffic Analysis</span>
                <span className="md:hidden text-xs">AI Analysis</span>
              </Button>
              <UserAvatar />
            </div>
          </div>
          <div className="h-0.5 sm:h-1 w-full gradient-primary rounded-full shadow-lg glow-secondary" />
        </header>

        {/* Metrics Grid */}
        <div className="mb-6 animate-fade-in">
          <MetricsGrid metrics={locationData?.metrics} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          {/* Map - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 glass-card rounded-xl sm:rounded-2xl p-0.5 sm:p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CityMap 
              onLocationFetch={handleLocationFetch} 
              isLoading={isAnalyzing}
              locationName={locationData?.locationName}
            />
          </div>
          
          {/* Weather Widget */}
          <div className="glass-card rounded-xl sm:rounded-2xl p-0.5 sm:p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <WeatherWidget weather={locationData?.weather} />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          {/* Traffic Display */}
          <div className="glass-card rounded-xl sm:rounded-2xl p-0.5 sm:p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <TrafficDisplay traffic={locationData?.traffic} />
          </div>
          
          {/* Prediction Panel */}
          <div className="glass-card rounded-xl sm:rounded-2xl p-0.5 sm:p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <PredictionPanel predictions={locationData?.predictions} />
          </div>
        </div>

        {/* Accident Prone Areas - Always visible */}
        <div className="mb-4 sm:mb-6">
          <div className="glass-card rounded-xl sm:rounded-2xl p-0.5 sm:p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <AccidentProneAreas areas={locationData?.accidentProneAreas} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 text-center">
          <div className="inline-block glass-card px-3 sm:px-6 py-2 sm:py-3 rounded-full border-primary/20 shadow-lg">
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
