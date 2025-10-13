import { useState } from "react";
import { Navigation, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RouteSearchBarProps {
  onSearch: (from: string, to: string) => void;
  isLoading: boolean;
}

const RouteSearchBar = ({ onSearch, isLoading }: RouteSearchBarProps) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from.trim() && to.trim()) {
      onSearch(from.trim(), to.trim());
    }
  };

  const popularRoutes = [
    { from: "Hyderabad", to: "Vijayawada" },
    { from: "Mumbai", to: "Pune" },
    { from: "Delhi", to: "Agra" },
    { from: "Bangalore", to: "Mysore" },
    { from: "Chennai", to: "Pondicherry" },
  ];

  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
          <Navigation className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Route Analysis</h2>
          <p className="text-sm text-muted-foreground">Get AI-powered traffic insights for your specific route</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-success" />
          <Input
            type="text"
            placeholder="From (e.g., Hyderabad)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="pl-10 bg-muted/30 border-border/50"
            disabled={isLoading}
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-destructive" />
          <Input
            type="text"
            placeholder="To (e.g., Vijayawada)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="pl-10 bg-muted/30 border-border/50"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={!from.trim() || !to.trim() || isLoading}
          className="w-full bg-gradient-primary hover:opacity-90"
        >
          {isLoading ? "Analyzing Route..." : "Analyze Route"}
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground">Popular routes:</span>
        {popularRoutes.map((route, index) => (
          <button
            key={index}
            onClick={() => {
              setFrom(route.from);
              setTo(route.to);
              onSearch(route.from, route.to);
            }}
            disabled={isLoading}
            className="text-xs px-3 py-1 rounded-full bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            {route.from} → {route.to}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RouteSearchBar;
