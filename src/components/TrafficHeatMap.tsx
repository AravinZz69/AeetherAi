import { MapPin, AlertTriangle } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface HeatMapData {
  criticalIntersections: string[];
  congestionZones: Array<{
    area: string;
    intensity: "high" | "medium" | "low";
    coordinates?: { lat: number; lng: number };
  }>;
}

interface TrafficHeatMapProps {
  data: HeatMapData;
}

const getIntensityColor = (intensity: string) => {
  switch (intensity) {
    case "high":
      return "bg-destructive/20 border-destructive text-destructive";
    case "medium":
      return "bg-warning/20 border-warning text-warning";
    case "low":
      return "bg-success/20 border-success text-success";
    default:
      return "bg-muted/20 border-muted text-muted-foreground";
  }
};

export const TrafficHeatMap = ({ data }: TrafficHeatMapProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold">Traffic Density Heat Map</h3>
      </div>

      {/* Critical Intersections */}
      {data.criticalIntersections && data.criticalIntersections.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h4 className="font-semibold text-destructive">Critical Hotspots</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.criticalIntersections.map((intersection, index) => (
              <Badge key={index} variant="destructive" className="px-3 py-1">
                {intersection}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Congestion Zones Grid */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-muted-foreground mb-3">Congestion Zones</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data.congestionZones.map((zone, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getIntensityColor(zone.intensity)} transition-all hover:scale-105`}
            >
              <div className="font-semibold text-sm mb-1">{zone.area}</div>
              <div className="text-xs capitalize">{zone.intensity} density</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">Legend:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="text-xs">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <span className="text-xs">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <span className="text-xs">High</span>
        </div>
      </div>
    </Card>
  );
};
