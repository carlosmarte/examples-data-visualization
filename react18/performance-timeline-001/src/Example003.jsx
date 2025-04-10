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

const TOTAL_WAIT_TIME = ["totalWaitTime"];
const MAX_FIRST_INPUT_DELAY = ["maxFirstInputDelay"];
const CUMULATIVE_LAYOUT_SHIFT = ["cumulativeLayoutShift"];
const FIRST_INTERACTIVE = ["firstInteractive"];

const uxMetrics = {
  [MAX_FIRST_INPUT_DELAY[0]]: getRandomInt(20, 400),
  [CUMULATIVE_LAYOUT_SHIFT[0]]: getRandomInt(20, 400),
  [FIRST_INTERACTIVE[0]]: getRandomInt(1020, 3400),
  [TOTAL_WAIT_TIME[0]]: getRandomInt(20, 400),
};

const data = [
  {
    name: "Page Load UX Flow",
    blockingTime: uxMetrics[TOTAL_WAIT_TIME[0]],
    fid: uxMetrics[MAX_FIRST_INPUT_DELAY[0]],
    cls: uxMetrics[CUMULATIVE_LAYOUT_SHIFT[0]],
    timeToInteractive:
      uxMetrics[FIRST_INTERACTIVE[0]] -
      (uxMetrics[TOTAL_WAIT_TIME[0]] +
        uxMetrics[MAX_FIRST_INPUT_DELAY[0]] +
        uxMetrics[CUMULATIVE_LAYOUT_SHIFT[0]]),
  },
];

const colors = {
  blockingTime: "#ff6b6b",
  fid: "#ffa502",
  cls: "#2ed573",
  timeToInteractive: "#1e90ff",
};

const VerticalLabel = ({ x, y, width, height, value, name }) => {
  return (
    <g>
      <text
        x={x + width / 2}
        y={y + height / 2}
        transform={`rotate(-90, ${x + width / 2}, ${y + height / 2})`}
        textAnchor="middle"
        fill="#000"
        fontSize={12}
        fontWeight="bold"
      >
        {`${value} ${name}`}
      </text>
    </g>
  );
};

const CustomLabelBelow = ({ x, y, width, height, value, name }) => {
  return (
    <g>
      <text
        x={x + width / 2}
        y={y + height / 2}
        transform={`rotate(-90, ${x + width / 2}, ${y + height / 2})`}
        textAnchor="middle"
        fill="#000"
        fontSize={12}
        fontWeight="bold"
      >
        {`${name}`}
      </text>
    </g>
  );
};

const UXTimelineChart = () => {
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

          <Bar dataKey="blockingTime" stackId="a" fill={colors.blockingTime}>
            <LabelList
              dataKey="blockingTime"
              content={(props) => (
                <>
                  <text
                    x={props.x + props.width / 2}
                    y={props.y + 15}
                    textAnchor="middle"
                    fill="#000"
                  >
                    {props.value}
                  </text>
                  <CustomLabelBelow {...props} name="Total Blocking Time" />
                </>
              )}
            />
          </Bar>

          <Bar dataKey="fid" stackId="a" fill={colors.fid}>
            <LabelList
              dataKey="fid"
              content={(props) => (
                <>
                  <text
                    x={props.x + props.width / 2}
                    y={props.y + 15}
                    textAnchor="middle"
                    fill="#000"
                  >
                    {props.value}
                  </text>
                  <CustomLabelBelow {...props} name="First Input Delay" />
                </>
              )}
            />
          </Bar>

          <Bar dataKey="cls" stackId="a" fill={colors.cls}>
            <LabelList
              dataKey="cls"
              content={(props) => (
                <>
                  <text
                    x={props.x + props.width / 2}
                    y={props.y + 15}
                    textAnchor="middle"
                    fill="#000"
                  >
                    {props.value}
                  </text>
                  <CustomLabelBelow {...props} name="Layout Shift" />
                </>
              )}
            />
          </Bar>

          <Bar
            dataKey="timeToInteractive"
            stackId="a"
            fill={colors.timeToInteractive}
          >
            <LabelList
              dataKey="timeToInteractive"
              content={(props) => (
                <>
                  <text
                    x={props.x + props.width / 2}
                    y={props.y + 15}
                    textAnchor="middle"
                    fill="#fff"
                  >
                    {props.value}
                  </text>
                  <CustomLabelBelow {...props} name="Time to Interactive" />
                </>
              )}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UXTimelineChart;
