import { useState } from "react";
import "./DeviceStatus.css";

const DeviceStatus = () => {
  const [availability] = useState(100);

  return (
    <div className="device-card">
      <h2 className="device-title">[title]</h2>
      <div className="divider"></div>
      <h3 className="status-label">Availability</h3>
      <div className="availability-value">{availability}%</div>
      <div className="device-name">[sub title]</div>
    </div>
  );
};

export default DeviceStatus;
