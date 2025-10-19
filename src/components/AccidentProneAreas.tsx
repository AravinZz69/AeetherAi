import { AlertTriangle, MapPin } from "lucide-react";

interface AccidentArea {
  area: string;
  riskLevel: string;
  accidents: string;
  description: string;
}

interface AccidentProneAreasProps {
  areas?: AccidentArea[];
}

const AccidentProneAreas = ({ areas }: AccidentProneAreasProps) => {
  if (!areas || areas.length === 0) {
    return null;
  }

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-destructive bg-destructive/20 border-destructive/30';
      case 'medium': return 'text-warning bg-warning/20 border-warning/30';
      case 'low': return 'text-success bg-success/20 border-success/30';
      default: return 'text-muted-foreground bg-muted/20 border-border/30';
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Accident Prone Areas</h2>
          <p className="text-sm text-muted-foreground">High-risk locations nearby</p>
        </div>
      </div>

      <div className="space-y-3">
        {areas.map((area, index) => (
          <div 
            key={index}
            className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium">{area.area}</span>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getRiskColor(area.riskLevel)}`}>
                {area.riskLevel} Risk
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{area.description}</p>
            <div className="flex items-center gap-2 text-xs">
              <AlertTriangle className="w-3 h-3 text-warning" />
              <span className="text-muted-foreground">{area.accidents} accidents reported</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccidentProneAreas;