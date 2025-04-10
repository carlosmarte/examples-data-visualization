import React from "react";
import Example001 from "./Example001";

// Component for the Activity Label
const ActivityLabel = ({ activity }) => {
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        color: "white",
        padding: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <h2
        style={{
          fontSize: "3rem",
          fontWeight: 300,
        }}
      >
        {activity}
      </h2>
    </div>
  );
};

// Component for Metric Cards
const MetricCard = ({ title, value, isHighlighted, subtitle }) => {
  return (
    <div
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: isHighlighted ? "#F7941D" : "transparent",
      }}
    >
      {subtitle && (
        <div
          style={{
            color: "#6b7280",
            fontSize: "0.875rem",
            textAlign: "center",
            marginBottom: "0.25rem",
          }}
        >
          {subtitle}
        </div>
      )}
      <div
        style={{
          fontSize: "3rem",
          fontWeight: 300,
          color: "#1e293b",
        }}
      >
        {value}
      </div>
    </div>
  );
};

// Component for the Scroll Depth Gauge
const ScrollGauge = ({ value }) => {
  // Calculate the percentage for the circle
  const percentage = (value / 10) * 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#f3f4f6"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#F7941D"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="18"
          fontWeight="500"
          fill="#1e293b"
        >
          {value}
        </text>
      </svg>
    </div>
  );
};

// Header Column component
const HeaderColumn = ({ title, subtitle }) => {
  return (
    <div
      style={{
        borderRight: subtitle ? "1px solid #e5e7eb" : "none",
        padding: "1rem",
        textAlign: "center",
        fontWeight: 500,
        color: "#1e293b",
      }}
    >
      {title}
      {subtitle && (
        <React.Fragment>
          <br />
          <span style={{ color: "#6b7280" }}>{subtitle}</span>
        </React.Fragment>
      )}
    </div>
  );
};

// Main Dashboard Component
const Example002 = () => {
  // Sample data (matches the image)
  const dashboardData = {
    activity: "page002",
    metrics: {
      loadTime: "2,77s",
      sessions: "2,77s",
      bounceRate: "67,9%",
      scrollDepth: "4,53",
      conversionRate: "8,08%",
    },
  };

  // Styles for grid
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    border: "1px solid #e5e7eb",
  };

  // Styles for grid cell
  const cellStyle = {
    borderRight: "1px solid #e5e7eb",
  };

  const lastCellStyle = {
    // No right border
  };

  // Styles for header grid
  const headerGridStyle = {
    ...gridStyle,
    backgroundColor: "#f9fafb",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1024px",
        margin: "0 auto",
        backgroundColor: "white",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header for column labels */}
      <div style={headerGridStyle}>
        <HeaderColumn title="ACTIVITY" />
        <HeaderColumn title="LOAD TIME" subtitle="(LCP)" />
        <HeaderColumn title="SESSIONS" subtitle="-SESSION" />
        <HeaderColumn title="BOUNCE" />
        <HeaderColumn title="SCROLL" />
        <HeaderColumn title="CONVERSION" />
      </div>

      {/* Data row */}
      <div style={gridStyle}>
        {/* Activity Label */}
        <div style={cellStyle}>
          <ActivityLabel activity={dashboardData.activity} />
        </div>

        {/* Load Time */}
        <div style={cellStyle}>
          <MetricCard
            value={dashboardData.metrics.loadTime}
            isHighlighted={true}
          />
        </div>

        {/* Sessions */}
        <div style={cellStyle}>
          <MetricCard value={dashboardData.metrics.sessions} />
        </div>

        {/* Bounce Rate */}
        <div style={cellStyle}>
          <MetricCard value={dashboardData.metrics.bounceRate} />
        </div>

        {/* Scroll Depth */}
        <div style={cellStyle}>
          <ScrollGauge value={dashboardData.metrics.scrollDepth} />
        </div>

        {/* Conversion Rate */}
        <div style={lastCellStyle}>
          <MetricCard value={dashboardData.metrics.conversionRate} />
        </div>
      </div>
    </div>
  );
};

export default Example002;
