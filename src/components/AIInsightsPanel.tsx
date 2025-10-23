import { Brain, Clock, Lightbulb, TrendingUp } from "lucide-react";

interface AIInsightsPanelProps {
  city: string;
  analysis: string;
  insights: string[];
  bestTimes: string;
  prediction: string;
}

const AIInsightsPanel = ({ city, analysis, insights, bestTimes, prediction }: AIInsightsPanelProps) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
          <Brain className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">AI Insights for {city}</h2>
          <p className="text-sm text-muted-foreground">Gemini-powered traffic analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Overall Analysis
          </h3>
          <p className="text-sm text-muted-foreground">{analysis}</p>
        </div>

        <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-warning" />
            Key Insights
          </h3>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-accent mt-1">•</span>
                <span className="text-muted-foreground">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-success/10 rounded-lg border border-success/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-success" />
              <h3 className="font-semibold text-sm">Best Travel Times</h3>
            </div>
            <p className="text-sm text-muted-foreground">{bestTimes}</p>
          </div>

          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-accent" />
              <h3 className="font-semibold text-sm">Traffic Prediction</h3>
            </div>
            <p className="text-sm text-muted-foreground">{prediction}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;
