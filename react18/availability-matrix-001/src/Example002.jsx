// AvailabilityGrid.jsx
import React, { useState, useEffect } from "react";
import "./Example002.css";

const AvailabilityGrid = ({ rows = 12, columns = 50 }) => {
  const [availabilityData, setAvailabilityData] = useState([]);

  // Generate data when component mounts or props change
  useEffect(() => {
    // Generate availability data
    const generateData = () => {
      const data = [];

      // Fill with base data (mostly green)
      for (let i = 0; i < rows * columns; i++) {
        data.push(99.0 + Math.random() * 0.89); // Green range (99.0-99.89)
      }

      // Add yellow values in a pattern (every 7th position)
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if ((i + j) % 7 === 0) {
            data[i * columns + j] = 99.9 + Math.random() * 0.09; // Yellow range (99.9-99.98)
          }
        }
      }

      // Add occasional red values (99.99+)
      for (let i = 0; i < rows; i += 4) {
        const randomCol = Math.floor(Math.random() * columns);
        data[i * columns + randomCol] = 99.99; // Red value
      }

      return data;
    };

    setAvailabilityData(generateData());
  }, [rows, columns]);

  // Function to determine color based on availability number
  const getColor = (availability) => {
    if (availability >= 99.99) return "#ff3366"; // Red for extremely high availability
    if (availability >= 99.9) return "#ffcc00"; // Yellow for very high availability
    return "#66cc66"; // Green for high availability
  };

  // Render the grid
  const renderGrid = () => {
    const gridItems = [];

    for (let r = 0; r < rows; r++) {
      const rowCells = [];

      for (let c = 0; c < columns; c++) {
        const index = r * columns + c;
        const availability = availabilityData[index] || 99.5;

        rowCells.push(
          <div
            key={`cell-${r}-${c}`}
            className="grid-cell"
            style={{ backgroundColor: getColor(availability) }}
            title={`Availability: ${availability.toFixed(2)}%`}
          >
            {/* Uncomment to show the value */}
            {/* <span className="cell-value">{availability.toFixed(2)}%</span> */}
          </div>
        );
      }

      gridItems.push(
        <div key={`row-${r}`} className="grid-row">
          {rowCells}
        </div>
      );
    }

    return gridItems;
  };

  return (
    <div className="availability-container">
      <div className="availability-grid">
        {availabilityData.length > 0 && renderGrid()}
      </div>

      <div className="grid-legend">
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#66cc66" }}
          ></div>
          <span>99.0 - 99.89% availability</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#ffcc00" }}
          ></div>
          <span>99.9 - 99.98% availability</span>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "#ff3366" }}
          ></div>
          <span>99.99 - 100% availability</span>
        </div>
      </div>

      <div className="grid-footer">
        <p>
          Each square represents the availability percentage for an individual
          application instance.
        </p>
        <p>Updated hourly. Last update: April 3, 2025 10:30 AM</p>
      </div>
    </div>
  );
};

export default AvailabilityGrid;
