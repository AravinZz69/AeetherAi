import { Cloud, Droplets, Wind, Sun, Thermometer } from "lucide-react";

const WeatherWidget = () => {
  return (
    <div className="glass-card rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Weather</h2>
            <p className="text-sm text-muted-foreground">Current conditions</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Thermometer className="w-8 h-8 text-primary" />
              <span className="text-5xl font-bold text-glow">24°</span>
            </div>
            <p className="text-muted-foreground mt-2">Partly Cloudy</p>
          </div>
          <Sun className="w-16 h-16 text-warning opacity-80" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Humidity</span>
            </div>
            <p className="text-lg font-bold">65%</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Wind</span>
            </div>
            <p className="text-lg font-bold">12 km/h</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Cloud className="w-4 h-4 text-secondary" />
              <span className="text-xs text-muted-foreground">Pressure</span>
            </div>
            <p className="text-lg font-bold">1013 hPa</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Tomorrow</p>
            <p className="font-bold mt-1">26° / 18°</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Tue</p>
            <p className="font-bold mt-1">25° / 17°</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Wed</p>
            <p className="font-bold mt-1">23° / 16°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
