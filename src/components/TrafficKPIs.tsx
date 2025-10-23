import { TrendingUp, TrendingDown, Minus, Car, Gauge, Activity } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface KPIData {
  congestionScore: number;
  congestionTrend: "up" | "down" | "stable";
  avgSpeed: number;
  speedTrend: "up" | "down" | "stable";
  vehicleVolume: number;
  volumeTrend: "up" | "down" | "stable";
}

interface TrafficKPIsProps {
  data: KPIData;
}

const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-success" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-destructive" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const getScoreColor = (score: number) => {
  if (score >= 7) return "text-destructive";
  if (score >= 4) return "text-warning";
  return "text-success";
};

export const TrafficKPIs = ({ data }: TrafficKPIsProps) => {
  const congestionPercentage = (data.congestionScore / 10) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Congestion Score */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Congestion Score</span>
          </div>
          <TrendIcon trend={data.congestionTrend} />
        </div>
        <div className={`text-4xl font-bold mb-2 ${getScoreColor(data.congestionScore)}`}>
          {data.congestionScore.toFixed(1)}/10
        </div>
        <Progress value={congestionPercentage} className="h-2" />
      </Card>

      {/* Average Speed */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Avg. Speed</span>
          </div>
          <TrendIcon trend={data.speedTrend} />
        </div>
        <div className="text-4xl font-bold mb-2">
          {data.avgSpeed}
          <span className="text-lg text-muted-foreground ml-1">km/h</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {data.speedTrend === "up" && "↑ Traffic flowing better"}
          {data.speedTrend === "down" && "↓ Slower than usual"}
          {data.speedTrend === "stable" && "→ Normal flow"}
        </div>
      </Card>

      {/* Vehicle Volume */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Vehicle Volume</span>
          </div>
          <TrendIcon trend={data.volumeTrend} />
        </div>
        <div className="text-4xl font-bold mb-2">
          {data.vehicleVolume.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground">Total vehicles analyzed</div>
      </Card>
    </div>
  );
};
