import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActivityLogger } from "@/hooks/useActivityLogger";

interface CitySearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const CitySearchBar = ({ onSearch, isLoading }: CitySearchBarProps) => {
  const [city, setCity] = useState("");
  const { logSearch } = useActivityLogger();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      logSearch("city", city.trim());
      onSearch(city.trim());
    }
  };

  const popularCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">City Traffic Analysis</h2>
          <p className="text-sm text-muted-foreground">Search any Indian city for AI-powered traffic insights</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore...)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-10 bg-muted/30 border-border/50"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={!city.trim() || isLoading}
          className="bg-gradient-primary hover:opacity-90"
        >
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground">Popular cities:</span>
        {popularCities.map((popularCity) => (
          <button
            key={popularCity}
            onClick={() => {
              setCity(popularCity);
              onSearch(popularCity);
            }}
            disabled={isLoading}
            className="text-xs px-3 py-1 rounded-full bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            {popularCity}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitySearchBar;
