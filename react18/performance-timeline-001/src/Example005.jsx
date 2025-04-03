import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MetricKey01 = [
  "totalWaitTime",
  getRandomInt(20, 400),
  { color: "#ff6b6b", name: "Total Blocking Time" },
];
const MetricKey02 = [
  "maxFirstInputDelay",
  getRandomInt(20, 400),
  { color: "#ffa502", name: "Max First Input Delay" },
];
const MetricKey03 = [
  "cumulativeLayoutShift",
  getRandomInt(20, 400),
  { color: "#2ed573", name: "Cumulative Layout Shift" },
];
const MetricKey04 = [
  "firstInteractive",
  getRandomInt(20, 400),
  { color: "#ffab6b", name: "First Interactive" },
];

const metrics = [MetricKey01, MetricKey02, MetricKey03, MetricKey04];

const data = [
  {
    name: "Page Load UX Flow",
    ...metrics.reduce((acc, key) => {
      acc[key[0]] = key[1];
      return acc;
    }, {}),
  },
];

const CustomLabelBelow = ({ x, y, width, height, value, name }) => {
  return (
    <g>
      <text
        x={x + width / 2}
        y={y + height / 2}
        transform={`rotate(-90, ${x + width / 2}, ${y + height / 2})`}
        textAnchor="middle"
        fill="#5f5f5f"
        fontSize={10}
        fontWeight="bold"
      >
        {name}
      </text>
    </g>
  );
};

const Example005 = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>UX Gantt-style Timeline</h3>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 50, left: 150, bottom: 20 }}
        >
          <XAxis type="number" unit="ms" />
          <YAxis dataKey="name" type="category" />
          <Tooltip formatter={(value) => `${value} ms`} />

          {metrics.map((key) => {
            return (
              <Bar dataKey={key[0]} stackId="a" fill={key[2].color}>
                <LabelList
                  dataKey={key[0]}
                  content={(props) => (
                    <>
                      <text
                        x={props.x + props.width / 2}
                        y={props.y + 15}
                        textAnchor="middle"
                        fill="#373737"
                      >
                        {props.value}
                      </text>
                      <CustomLabelBelow {...props} name={key[2].name} />
                    </>
                  )}
                />
              </Bar>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Example005;
