import { FC } from "react";

const MonitorMatrix = ({ monitors, columns = 22 }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "#4CAF50"; // Green
      case "warning":
        return "#FFC107"; // Yellow
      case "critical":
        return "#F44336"; // Red
      case "inactive":
        return "#9E9E9E"; // Grey
      case "maintenance":
        return "#2196F3"; // Blue
      case "unknown":
      default:
        return "#9E9E9E"; // Grey
    }
  };

  return (
    <div className="monitor-matrix">
      <div
        className="matrix-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "4px",
          backgroundColor: "#1E1E1E",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "fit-content",
        }}
      >
        {monitors.map((monitor, index) => (
          <div
            key={index}
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: getStatusColor(monitor.status),
              borderRadius: "2px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MonitorMatrix;
