import { Card } from "./ui/card";
import { Lightbulb } from "lucide-react";

interface SummaryBullet {
  icon: string;
  text: string;
}

interface TrafficSummaryProps {
  summaryBullets: SummaryBullet[];
}

export const TrafficSummary = ({ summaryBullets }: TrafficSummaryProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold">Key Insights & Recommendations</h3>
      </div>
      
      <div className="space-y-4">
        {summaryBullets.map((bullet, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <span className="text-3xl flex-shrink-0">{bullet.icon}</span>
            <p className="text-base leading-relaxed pt-1">{bullet.text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
