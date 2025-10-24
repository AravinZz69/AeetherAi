import { Users, Zap, Droplet, Wifi } from "lucide-react";

interface MetricsGridProps {
  metrics?: {
    population: string;
    populationChange: string;
    energyUsage: string;
    energyChange: string;
    waterSupply: string;
    waterChange: string;
    networkCoverage: string;
    networkStatus: string;
  };
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  const displayMetrics = [
    {
      title: "Population",
      value: metrics?.population || "N/A",
      change: metrics?.populationChange || "N/A",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/20"
    },
    {
      title: "Energy Usage",
      value: metrics?.energyUsage || "N/A",
      change: metrics?.energyChange || "N/A",
      icon: Zap,
      color: "text-warning",
      bgColor: "bg-warning/20"
    },
    {
      title: "Water Supply",
      value: metrics?.waterSupply || "N/A",
      change: metrics?.waterChange || "N/A",
      icon: Droplet,
      color: "text-accent",
      bgColor: "bg-accent/20"
    },
    {
      title: "Network",
      value: metrics?.networkCoverage || "N/A",
      change: metrics?.networkStatus || "N/A",
      icon: Wifi,
      color: "text-success",
      bgColor: "bg-success/20"
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      {displayMetrics.map((metric, index) => (
        <div 
          key={index}
          className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg ${metric.bgColor} flex items-center justify-center flex-shrink-0`}>
              <metric.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${metric.color}`} />
            </div>
            <span className={`text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-center min-w-0 ${
              metric.change.startsWith('+') ? 'bg-success/20 text-success' : 
              metric.change.startsWith('-') ? 'bg-destructive/20 text-destructive' : 
              'bg-muted/50 text-muted-foreground'
            }`}>
              {metric.change}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{metric.title}</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-glow truncate">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;
