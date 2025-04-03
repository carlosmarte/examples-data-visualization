import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rawMetrics = {
  totalBlockTime: getRandomInt(20, 400),
  cumulativeLayoutShift: 0.15,
  maxFirstInputDelay: getRandomInt(20, 400),
  firstInteractive: getRandomInt(20, 400),
};

const normalizedMetrics = [
  {
    metric: "Total Blocking Time",
    value: rawMetrics.totalBlockTime / 600, // target <200ms → scale up to 600
  },
  {
    metric: "Cumulative Layout Shift",
    value: rawMetrics.cumulativeLayoutShift / 0.25, // target <0.1 → scale to 0.25
  },
  {
    metric: "Max First Input Delay",
    value: rawMetrics.maxFirstInputDelay / 300, // target <100 → scale to 300
  },
  {
    metric: "First Consistently Interactive",
    value: rawMetrics.firstInteractive / 5000, // target <3s → scale to 5s
  },
];

const Example002 = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>User Experience Radar Chart (Normalized)</h3>
      <ResponsiveContainer>
        <RadarChart outerRadius={120} data={normalizedMetrics}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis angle={30} domain={[0, 1]} />
          <Tooltip formatter={(val) => `${(val * 100).toFixed(0)}%`} />
          <Radar
            name="UX Score"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Example002;
