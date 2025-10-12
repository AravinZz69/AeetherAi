import { Brain, TrendingUp, Zap, AlertCircle } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const PredictionPanel = () => {
  const predictionData = [
    { time: "00:00", value: 45 },
    { time: "04:00", value: 30 },
    { time: "08:00", value: 75 },
    { time: "12:00", value: 85 },
    { time: "16:00", value: 90 },
    { time: "20:00", value: 65 },
    { time: "24:00", value: 50 },
  ];

  const predictions = [
    {
      title: "Traffic Peak",
      value: "17:30 - 18:45",
      status: "warning",
      icon: AlertCircle,
      color: "text-warning"
    },
    {
      title: "Energy Consumption",
      value: "+15% increase",
      status: "info",
      icon: Zap,
      color: "text-accent"
    },
    {
      title: "Air Quality",
      value: "Good (AQI: 45)",
      status: "success",
      icon: TrendingUp,
      color: "text-success"
    }
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
          <Brain className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">AI Predictions</h2>
          <p className="text-sm text-muted-foreground">Next 24 hours</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Traffic Forecast</span>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">Live</span>
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={predictionData}>
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              tickLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {predictions.map((pred, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <pred.icon className={`w-5 h-5 ${pred.color}`} />
              <div>
                <p className="font-medium text-sm">{pred.title}</p>
                <p className="text-xs text-muted-foreground">{pred.value}</p>
              </div>
            </div>
            <TrendingUp className={`w-4 h-4 ${pred.color}`} />
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">AI Insight</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Traffic congestion expected at 5:30 PM. Consider alternative routes or public transport.
        </p>
      </div>
    </div>
  );
};

export default PredictionPanel;
