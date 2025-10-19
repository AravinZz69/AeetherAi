import { useState } from "react";
import { Activity, Brain, Shield } from "lucide-react";
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
import { useAdminAccess } from "@/hooks/useAdminAccess";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [showPreLoader, setShowPreLoader] = useState(true);
  const { isAdmin } = useAdminAccess();
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
    <div className="min-h-screen relative overflow-hidden p-4 md:p-6 lg:p-8">
      {/* Animated background */}
      <div className="fixed inset-0 gradient-mesh opacity-20 pointer-events-none -z-10" />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Mission Statement Hero */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center glow-accent shadow-2xl floating mx-auto">
              <Activity className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-glow mb-4">
            AetherAi
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Transforming Raw Traffic Data into Crystal-Clear, Actionable Business Intelligence
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-8">
            The single source of truth for consortium members, delivering real-time insights and predictive analytics to optimize urban mobility and drive informed decision-making.
          </p>
          <div className="h-1 w-32 gradient-primary rounded-full shadow-lg glow-secondary mx-auto" />
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Live Dashboard
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Real-time traffic intelligence & predictions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                onClick={() => navigate("/admin/login")}
                variant="outline"
                className="flex items-center gap-2 glass-card border-primary/30"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Admin Portal</span>
              </Button>
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
          <MetricsGrid metrics={locationData?.metrics} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Map - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CityMap 
              onLocationFetch={handleLocationFetch} 
              isLoading={isAnalyzing}
              locationName={locationData?.locationName}
            />
          </div>
          
          {/* Weather Widget */}
          <div className="glass-card rounded-2xl p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <WeatherWidget weather={locationData?.weather} />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Traffic Display */}
          <div className="glass-card rounded-2xl p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <TrafficDisplay traffic={locationData?.traffic} />
          </div>
          
          {/* Prediction Panel */}
          <div className="glass-card rounded-2xl p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <PredictionPanel predictions={locationData?.predictions} />
          </div>
        </div>

        {/* Accident Prone Areas - Always visible */}
        <div className="mb-6">
          <div className="glass-card rounded-2xl p-1 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <AccidentProneAreas areas={locationData?.accidentProneAreas} />
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
