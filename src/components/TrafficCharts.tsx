import { Card } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Clock, Calendar, Car, AlertCircle } from "lucide-react";

interface TrafficChartsProps {
  peakHourData: Array<{ hour: string; congestion: number }>;
  weeklyTrend: Array<{ day: string; avgDelay: number }>;
  vehicleComposition: Array<{ type: string; percentage: number }>;
  incidentBreakdown: Array<{ type: string; percentage: number }>;
}

const COLORS = {
  primary: "hsl(var(--primary))",
  success: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  destructive: "hsl(var(--destructive))",
  accent: "hsl(var(--accent))",
  muted: "hsl(var(--muted-foreground))",
};

const PIE_COLORS = [COLORS.primary, COLORS.accent, COLORS.warning, COLORS.success];

export const TrafficCharts = ({
  peakHourData,
  weeklyTrend,
  vehicleComposition,
  incidentBreakdown,
}: TrafficChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Peak Hour Congestion - Line Chart */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Peak Hour Congestion</h3>
            <p className="text-xs text-muted-foreground">Congestion levels throughout the day</p>
          </div>
        </div>
        <ChartContainer
          config={{
            congestion: {
              label: "Congestion Level",
              color: COLORS.primary,
            },
          }}
          className="h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={peakHourData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="congestion"
                stroke={COLORS.primary}
                strokeWidth={3}
                dot={{ fill: COLORS.primary, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Weekly Trend - Bar Chart */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Weekly Delay Trend</h3>
            <p className="text-xs text-muted-foreground">Average delay time by day</p>
          </div>
        </div>
        <ChartContainer
          config={{
            avgDelay: {
              label: "Avg Delay (min)",
              color: COLORS.warning,
            },
          }}
          className="h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="avgDelay" fill={COLORS.warning} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Vehicle Composition - Donut Chart */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Car className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Vehicle Composition</h3>
            <p className="text-xs text-muted-foreground">Distribution by vehicle type</p>
          </div>
        </div>
        <ChartContainer
          config={{
            percentage: {
              label: "Percentage",
            },
          }}
          className="h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={vehicleComposition}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="percentage"
                label={({ type, percentage }) => `${type}: ${percentage}%`}
                labelLine={false}
              >
                {vehicleComposition.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Incident Breakdown - Pie Chart */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Incident Breakdown</h3>
            <p className="text-xs text-muted-foreground">Traffic incidents by type</p>
          </div>
        </div>
        <ChartContainer
          config={{
            percentage: {
              label: "Percentage",
            },
          }}
          className="h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={incidentBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="percentage"
                label={({ type, percentage }) => `${type}: ${percentage}%`}
              >
                {incidentBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>
    </div>
  );
};
