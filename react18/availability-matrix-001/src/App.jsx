import MonitorMatrix from "./components/MonitorMatrix";

function App() {
  const mockMonitors = Array(484)
    .fill(null)
    .map(() => ({
      status: [
        "healthy",
        "warning",
        "critical",
        "inactive",
        "maintenance",
        "unknown",
      ][Math.floor(Math.random() * 6)],
    }));

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <MonitorMatrix monitors={mockMonitors} />
    </div>
  );
}

export default App;
