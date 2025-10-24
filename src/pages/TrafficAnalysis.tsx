import { useState } from "react";
import { Activity, Route, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CitySearchBar from "@/components/CitySearchBar";
import RouteSearchBar from "@/components/RouteSearchBar";
import TrafficRouteCard from "@/components/TrafficRouteCard";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import MetricsGrid from "@/components/MetricsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserAvatar } from "@/components/UserAvatar";

interface RouteData {
  name: string;
  from: string;
  to: string;
  distance: string;
  estimatedTime: string;
  trafficStatus: string;
  description: string;
  alternativeRoute?: string;
}

interface CityMetrics {
  population: string;
  populationChange: string;
  energyUsage: string;
  energyChange: string;
  waterSupply: string;
  waterChange: string;
  networkCoverage: string;
  networkStatus: string;
}

interface AnalysisData {
  city: string;
  analysis: string;
  cityMetrics: CityMetrics;
  trafficFreeRoutes: RouteData[];
  trafficRoutes: RouteData[];
  aiInsights: string[];
  bestTimes: string;
  prediction: string;
}

const TrafficAnalysis = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const handleCitySearch = async (city: string) => {
    setIsLoading(true);
    setAnalysisData(null);

    try {
      console.log('Invoking analyze-city-traffic function for:', city);
      
      const { data, error } = await supabase.functions.invoke('analyze-city-traffic', {
        body: { city }
      });

      if (error) {
        console.error('Function invocation error:', error);
        throw error;
      }

      console.log('Function response:', data);

      if (data.success && data.data) {
        setAnalysisData(data.data);
        toast.success(`Traffic analysis completed for ${city}!`);
      } else {
        throw new Error(data.error || 'Failed to analyze traffic');
      }
    } catch (error) {
      console.error('Error analyzing traffic:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to analyze traffic. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouteSearch = async (from: string, to: string) => {
    setIsLoading(true);
    setAnalysisData(null);

    try {
      console.log('Invoking analyze-city-traffic function for route:', from, 'to', to);
      
      const { data, error } = await supabase.functions.invoke('analyze-city-traffic', {
        body: { from, to }
      });

      if (error) {
        console.error('Function invocation error:', error);
        throw error;
      }

      console.log('Function response:', data);

      if (data.success && data.data) {
        setAnalysisData(data.data);
        toast.success(`Route analysis completed for ${from} to ${to}!`);
      } else {
        throw new Error(data.error || 'Failed to analyze route');
      }
    } catch (error) {
      console.error('Error analyzing route:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to analyze route. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="rounded-full flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-primary flex items-center justify-center glow-effect flex-shrink-0">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-glow truncate">AetherAi Traffic Analysis</h1>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base truncate">Powered by Google Gemini - Smart route planning & traffic insights</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
              <ThemeToggle />
              <UserAvatar />
            </div>
          </div>
          <div className="h-0.5 sm:h-1 w-full bg-gradient-primary rounded-full opacity-30" />
        </header>

        {/* Metrics Grid */}
        {analysisData && (
          <div className="mb-6">
            <MetricsGrid metrics={analysisData.cityMetrics} />
          </div>
        )}

        {/* Search Options */}
        <Tabs defaultValue="city" className="mb-4 sm:mb-6">
          <TabsList className="grid w-full max-w-sm sm:max-w-md mx-auto grid-cols-2 mb-3 sm:mb-4 h-9 sm:h-10">
            <TabsTrigger value="city" className="text-xs sm:text-sm">City Analysis</TabsTrigger>
            <TabsTrigger value="route" className="text-xs sm:text-sm">Route Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="city">
            <CitySearchBar onSearch={handleCitySearch} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="route">
            <RouteSearchBar onSearch={handleRouteSearch} isLoading={isLoading} />
          </TabsContent>
        </Tabs>

        {/* Loading State */}
        {isLoading && (
          <div className="glass-card rounded-xl p-6 sm:p-8 md:p-12 text-center">
            <div className="animate-spin w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-3 sm:border-4 border-primary border-t-transparent rounded-full mx-auto mb-3 sm:mb-4" />
            <p className="text-base sm:text-lg font-semibold">Analyzing traffic patterns with AI...</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">This may take a few moments</p>
          </div>
        )}

        {/* Analysis Results */}
        {analysisData && !isLoading && (
          <div className="space-y-6">
            {/* AI Insights Panel */}
            <AIInsightsPanel
              city={analysisData.city}
              analysis={analysisData.analysis}
              insights={analysisData.aiInsights}
              bestTimes={analysisData.bestTimes}
              prediction={analysisData.prediction}
            />

            {/* Traffic-Free Routes */}
            {analysisData.trafficFreeRoutes && analysisData.trafficFreeRoutes.length > 0 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Route className="w-5 h-5 sm:w-6 sm:h-6 text-success flex-shrink-0" />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Traffic-Free Routes</h2>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">({analysisData.trafficFreeRoutes.length} routes)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {analysisData.trafficFreeRoutes.map((route, index) => (
                    <TrafficRouteCard key={index} route={route} type="traffic-free" />
                  ))}
                </div>
              </div>
            )}

            {/* Traffic Routes */}
            {analysisData.trafficRoutes && analysisData.trafficRoutes.length > 0 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Route className="w-5 h-5 sm:w-6 sm:h-6 text-warning flex-shrink-0" />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold">High Traffic Routes</h2>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">({analysisData.trafficRoutes.length} routes to avoid)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {analysisData.trafficRoutes.map((route, index) => (
                    <TrafficRouteCard key={index} route={route} type="traffic" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!analysisData && !isLoading && (
          <div className="glass-card rounded-xl p-6 sm:p-8 md:p-12 text-center">
            <Route className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-muted-foreground/50 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Ready to Analyze Traffic</h3>
            <p className="text-muted-foreground text-sm sm:text-base px-2">
              Search for any Indian city above to get AI-powered traffic insights
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficAnalysis;
