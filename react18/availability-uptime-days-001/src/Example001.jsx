import "./Example001.css";

const services = [
  { name: "API", uptime: "100.00%", status: "Up" },
  { name: "Blog", uptime: "99.94%", status: "Up" },
  { name: "Heartbeat app", uptime: "99.977%", status: "Up" },
  { name: "Monitoring Engine", uptime: "100.00%", status: "Up" },
  { name: "Website", uptime: "100.00%", status: "Up" },
];

function App() {
  const generateDays = (uptime) => {
    // Convert uptime percentage to decimal
    const uptimeDecimal = parseFloat(uptime.replace("%", "")) / 100;

    // Calculate how many days should show downtime
    const totalDays = 90;
    const downtimeDays = Math.round(totalDays * (1 - uptimeDecimal));

    return Array(totalDays)
      .fill(null)
      .map((_, index) => ({
        isUp: index >= totalDays - downtimeDays,
      }));
  };

  return (
    <div className="uptime-container">
      <h1>Uptime Last 90 days</h1>
      <div className="services-list">
        {services.map((service) => (
          <div key={service.name} className="service-row">
            <div className="service-name">{service.name}</div>
            <div className="service-uptime">{service.uptime}</div>
            <div className="uptime-bar">
              {generateDays(service.uptime).map((day, index) => (
                <div
                  key={index}
                  className={`day-bar ${day.isUp ? "down" : "up"}`}
                ></div>
              ))}
            </div>
            {/* <div className="status">
              <span className="status-dot"></span>
              {service.status}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
