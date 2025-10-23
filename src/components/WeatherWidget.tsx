import { Cloud, Droplets, Wind, Sun, Thermometer } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  forecast: Array<{ day: string; high: number; low: number }>;
}

interface WeatherWidgetProps {
  weather?: WeatherData;
}

const WeatherWidget = ({ weather }: WeatherWidgetProps) => {
  const defaultWeather = {
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    forecast: [
      { day: "Tomorrow", high: 26, low: 18 },
      { day: "Tue", high: 25, low: 17 },
      { day: "Wed", high: 23, low: 16 }
    ]
  };

  const currentWeather = weather || defaultWeather;
  return (
    <div className="glass-card rounded-xl p-6 relative overflow-hidden border-2 border-primary/20 animate-pulse-border">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-2 right-2">
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
        </span>
      </div>
      
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
              <Thermometer className="w-8 h-8 text-primary animate-pulse" />
              <AnimatedNumber 
                value={currentWeather.temperature} 
                decimals={0}
                suffix="°"
                className="text-5xl font-bold text-glow"
              />
            </div>
            <p className="text-muted-foreground mt-2">{currentWeather.condition}</p>
          </div>
          <Sun className="w-16 h-16 text-warning opacity-80 animate-pulse" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50 transition-all duration-300 hover:border-accent/50">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-xs text-muted-foreground">Humidity</span>
            </div>
            <AnimatedNumber 
              value={currentWeather.humidity} 
              decimals={0}
              suffix="%"
              className="text-lg font-bold"
            />
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50 transition-all duration-300 hover:border-primary/50">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Wind</span>
            </div>
            <AnimatedNumber 
              value={currentWeather.windSpeed} 
              decimals={0}
              suffix=" km/h"
              className="text-lg font-bold"
            />
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50 transition-all duration-300 hover:border-secondary/50">
            <div className="flex items-center gap-2 mb-1">
              <Cloud className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-xs text-muted-foreground">Pressure</span>
            </div>
            <AnimatedNumber 
              value={currentWeather.pressure} 
              decimals={0}
              suffix=" hPa"
              className="text-lg font-bold"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          {currentWeather.forecast.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-muted-foreground">{day.day}</p>
              <p className="font-bold mt-1">{day.high}° / {day.low}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
