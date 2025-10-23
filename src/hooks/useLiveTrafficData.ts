import { useEffect, useState } from "react";

interface DashboardKPIs {
  congestionScore: number;
  congestionTrend: "up" | "down" | "stable";
  avgSpeed: number;
  speedTrend: "up" | "down" | "stable";
  vehicleVolume: number;
  volumeTrend: "up" | "down" | "stable";
}

interface HeatMapData {
  criticalIntersections: string[];
  congestionZones: Array<{
    area: string;
    intensity: "high" | "medium" | "low";
    coordinates?: { lat: number; lng: number };
  }>;
}

interface LiveDataState {
  dashboardKPIs: DashboardKPIs;
  heatMapData: HeatMapData;
}

const getRandomVariation = (value: number, maxChange: number): number => {
  const change = (Math.random() - 0.5) * 2 * maxChange;
  return Math.max(0, value + change);
};

const getTrend = (oldValue: number, newValue: number): "up" | "down" | "stable" => {
  if (newValue > oldValue + 0.5) return "up";
  if (newValue < oldValue - 0.5) return "down";
  return "stable";
};

const getRandomIntensity = (): "high" | "medium" | "low" => {
  const rand = Math.random();
  if (rand < 0.3) return "high";
  if (rand < 0.7) return "medium";
  return "low";
};

export const useLiveTrafficData = (initialData: LiveDataState | null) => {
  const [liveData, setLiveData] = useState<LiveDataState | null>(initialData);

  useEffect(() => {
    if (!initialData) return;

    setLiveData(initialData);

    const interval = setInterval(() => {
      setLiveData((prev) => {
        if (!prev) return prev;

        const oldCongestion = prev.dashboardKPIs.congestionScore;
        const oldSpeed = prev.dashboardKPIs.avgSpeed;
        const oldVolume = prev.dashboardKPIs.vehicleVolume;

        const newCongestion = Math.min(10, Math.max(0, getRandomVariation(oldCongestion, 0.5)));
        const newSpeed = Math.min(120, Math.max(5, getRandomVariation(oldSpeed, 3)));
        const newVolume = Math.max(1000, getRandomVariation(oldVolume, oldVolume * 0.02));

        const updatedZones = prev.heatMapData.congestionZones.map(zone => ({
          ...zone,
          intensity: Math.random() > 0.7 ? getRandomIntensity() : zone.intensity,
        }));

        return {
          dashboardKPIs: {
            congestionScore: parseFloat(newCongestion.toFixed(1)),
            congestionTrend: getTrend(oldCongestion, newCongestion),
            avgSpeed: Math.round(newSpeed),
            speedTrend: getTrend(oldSpeed, newSpeed),
            vehicleVolume: Math.round(newVolume),
            volumeTrend: getTrend(oldVolume, newVolume),
          },
          heatMapData: {
            ...prev.heatMapData,
            congestionZones: updatedZones,
          },
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [initialData]);

  return liveData;
};
