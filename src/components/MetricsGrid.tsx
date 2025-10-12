import { Users, Zap, Droplet, Wifi } from "lucide-react";

const MetricsGrid = () => {
  const metrics = [
    {
      title: "Population",
      value: "1.2M",
      change: "+2.3%",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/20"
    },
    {
      title: "Energy Usage",
      value: "456 MW",
      change: "-5.1%",
      icon: Zap,
      color: "text-warning",
      bgColor: "bg-warning/20"
    },
    {
      title: "Water Supply",
      value: "98%",
      change: "+1.2%",
      icon: Droplet,
      color: "text-accent",
      bgColor: "bg-accent/20"
    },
    {
      title: "Network",
      value: "99.9%",
      change: "Stable",
      icon: Wifi,
      color: "text-success",
      bgColor: "bg-success/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="glass-card rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              metric.change.startsWith('+') ? 'bg-success/20 text-success' : 
              metric.change.startsWith('-') ? 'bg-destructive/20 text-destructive' : 
              'bg-muted/50 text-muted-foreground'
            }`}>
              {metric.change}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
          <p className="text-2xl font-bold text-glow">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;
