import { MapPin, Navigation, Locate, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CityMapProps {
  onLocationFetch: (latitude: number, longitude: number) => void;
  isLoading?: boolean;
  locationName?: string;
}

const CityMap = ({ onLocationFetch, isLoading, locationName }: CityMapProps) => {
  const [fetchingLocation, setFetchingLocation] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFetchingLocation(false);
        onLocationFetch(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setFetchingLocation(false);
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location');
      }
    );
  };
  return (
    <div className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold truncate">City Overview</h2>
            {locationName && (
              <div className="flex items-center gap-1 sm:gap-2 mt-1">
                <MapPinned className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{locationName}</p>
              </div>
            )}
          </div>
          <Button
            onClick={handleGetLocation}
            disabled={fetchingLocation || isLoading}
            size="sm"
            className="flex items-center gap-1 sm:gap-2 gradient-primary hover:opacity-90 touch-target flex-shrink-0"
          >
            <Locate className={`w-3 h-3 sm:w-4 sm:h-4 ${fetchingLocation ? 'animate-spin' : ''}`} />
            <span className="text-xs sm:text-sm">{fetchingLocation ? 'Locating...' : 'My Location'}</span>
          </Button>
        </div>
        
        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-muted/30 rounded-md sm:rounded-lg overflow-hidden border border-border/50">
          {/* Simplified map visualization */}
          <svg className="w-full h-full" viewBox="0 0 400 400">
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#grid)" />
            
            {/* Roads */}
            <line x1="0" y1="200" x2="400" y2="200" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.6" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.6" />
            <line x1="100" y1="0" x2="100" y2="400" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
            <line x1="300" y1="0" x2="300" y2="400" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
            
            {/* Location markers */}
            <circle cx="150" cy="150" r="8" fill="hsl(var(--accent))" className="animate-pulse" />
            <circle cx="250" cy="250" r="8" fill="hsl(var(--warning))" className="animate-pulse" />
            <circle cx="300" cy="120" r="8" fill="hsl(var(--success))" className="animate-pulse" />
            <circle cx="120" cy="280" r="8" fill="hsl(var(--accent))" className="animate-pulse" />
          </svg>
          
          {/* Location pins */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin className="w-6 h-6 text-accent drop-shadow-lg" fill="currentColor" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card/90 px-2 py-1 rounded text-xs whitespace-nowrap border border-accent/30">
                Downtown
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <MapPin className="w-6 h-6 text-warning drop-shadow-lg" fill="currentColor" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card/90 px-2 py-1 rounded text-xs whitespace-nowrap border border-warning/30">
                High Traffic
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm flex-wrap">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent animate-pulse" />
            <span className="text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-warning animate-pulse" />
            <span className="text-muted-foreground">Busy</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground">Clear</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityMap;
