import { useState } from "react";
import { Activity, Route } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CitySearchBar from "@/components/CitySearchBar";
import TrafficRouteCard from "@/components/TrafficRouteCard";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import MetricsGrid from "@/components/MetricsGrid";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-effect">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-glow">AI Traffic Analysis</h1>
              <p className="text-muted-foreground">Powered by Google Gemini - Analyze Indian city traffic patterns</p>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-primary rounded-full opacity-30" />
        </header>

        {/* Metrics Grid */}
        {analysisData && (
          <div className="mb-6">
            <MetricsGrid metrics={analysisData.cityMetrics} />
          </div>
        )}

        {/* Search Bar */}
        <CitySearchBar onSearch={handleCitySearch} isLoading={isLoading} />

        {/* Loading State */}
        {isLoading && (
          <div className="glass-card rounded-xl p-12 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-lg font-semibold">Analyzing traffic patterns with AI...</p>
            <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
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
                <div className="flex items-center gap-3 mb-4">
                  <Route className="w-6 h-6 text-success" />
                  <h2 className="text-2xl font-bold">Traffic-Free Routes</h2>
                  <span className="text-sm text-muted-foreground">({analysisData.trafficFreeRoutes.length} routes)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisData.trafficFreeRoutes.map((route, index) => (
                    <TrafficRouteCard key={index} route={route} type="traffic-free" />
                  ))}
                </div>
              </div>
            )}

            {/* Traffic Routes */}
            {analysisData.trafficRoutes && analysisData.trafficRoutes.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Route className="w-6 h-6 text-warning" />
                  <h2 className="text-2xl font-bold">High Traffic Routes</h2>
                  <span className="text-sm text-muted-foreground">({analysisData.trafficRoutes.length} routes to avoid)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="glass-card rounded-xl p-12 text-center">
            <Route className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to Analyze Traffic</h3>
            <p className="text-muted-foreground">
              Search for any Indian city above to get AI-powered traffic insights
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficAnalysis;
