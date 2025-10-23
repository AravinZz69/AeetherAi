import { TrendingUp, TrendingDown, Minus, Car, Gauge, Activity, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { AnimatedNumber } from "./AnimatedNumber";

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
      <Card className="glass-card p-6 relative overflow-hidden border-2 border-primary/20 animate-pulse-border">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-destructive/20 to-warning/20 rounded-full blur-3xl" />
        <div className="absolute top-2 right-2">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
          </span>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center animate-pulse">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Congestion Score</span>
            </div>
            <TrendIcon trend={data.congestionTrend} />
          </div>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(data.congestionScore)}`}>
            <AnimatedNumber value={data.congestionScore} decimals={1} />/10
          </div>
          <Progress value={congestionPercentage} className="h-2 animate-pulse" />
        </div>
      </Card>

      {/* Average Speed */}
      <Card className="glass-card p-6 relative overflow-hidden border-2 border-primary/20 animate-pulse-border">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-2 right-2">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center animate-pulse">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Avg. Speed</span>
            </div>
            <TrendIcon trend={data.speedTrend} />
          </div>
          <div className="text-4xl font-bold mb-2">
            <AnimatedNumber value={data.avgSpeed} decimals={0} />
            <span className="text-lg text-muted-foreground ml-1">km/h</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {data.speedTrend === "up" && "↑ Traffic flowing better"}
            {data.speedTrend === "down" && "↓ Slower than usual"}
            {data.speedTrend === "stable" && "→ Normal flow"}
          </div>
        </div>
      </Card>

      {/* Vehicle Volume */}
      <Card className="glass-card p-6 relative overflow-hidden border-2 border-primary/20 animate-pulse-border">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-success/20 to-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-2 right-2">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
          </span>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center animate-pulse">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Vehicle Volume</span>
            </div>
            <TrendIcon trend={data.volumeTrend} />
          </div>
          <div className="text-4xl font-bold mb-2">
            <AnimatedNumber value={data.vehicleVolume} decimals={0} className="inline-block" />
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            Total vehicles analyzed
          </div>
        </div>
      </Card>
    </div>
  );
};
