import { Route, Clock, TrendingUp, MapPin, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";

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

interface TrafficRouteCardProps {
  route: RouteData;
  type: "traffic-free" | "traffic";
}

const TrafficRouteCard = ({ route, type }: TrafficRouteCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "clear": return "text-success bg-success/20";
      case "moderate": return "text-accent bg-accent/20";
      case "heavy": return "text-warning bg-warning/20";
      case "congested": return "text-destructive bg-destructive/20";
      default: return "text-muted-foreground bg-muted/20";
    }
  };

  const isClear = type === "traffic-free";

  return (
    <Card className="glass-card p-4 hover:scale-105 transition-transform">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${isClear ? 'bg-success/20' : 'bg-warning/20'} flex items-center justify-center`}>
            <Route className={`w-4 h-4 ${isClear ? 'text-success' : 'text-warning'}`} />
          </div>
          <h3 className="font-bold">{route.name}</h3>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(route.trafficStatus)}`}>
          {route.trafficStatus}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">From:</span>
          <span className="font-medium">{route.from}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Navigation className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">To:</span>
          <span className="font-medium">{route.to}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 p-2 bg-muted/20 rounded-lg">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{route.distance}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium">{route.estimatedTime}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-2">{route.description}</p>

      {route.alternativeRoute && (
        <div className="p-2 bg-accent/10 rounded-lg border border-accent/30">
          <p className="text-xs text-accent font-semibold mb-1">Alternative Route:</p>
          <p className="text-xs">{route.alternativeRoute}</p>
        </div>
      )}
    </Card>
  );
};

export default TrafficRouteCard;
