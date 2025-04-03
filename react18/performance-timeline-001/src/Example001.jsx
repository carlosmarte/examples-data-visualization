import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Sample data (ms)
const performanceData = [
  { name: "firstByte", time: 120 },
  { name: "startRender", time: 320 },
  { name: "loadEventStart", time: 1200 },
  { name: "visuallyComplete", time: 1450 },
  { name: "fullyLoaded", time: 1600 },
  { name: "largestContentfulPaint", time: 1350 },
];

const Example001 = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Page Load Timing Metrics (ms)</h3>
      <ResponsiveContainer>
        <BarChart
          data={performanceData}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
        >
          <XAxis type="number" domain={[0, "dataMax + 300"]} />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip formatter={(value) => `${value} ms`} />
          <Bar dataKey="time" fill="#82ca9d">
            <LabelList dataKey="time" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Example001;
