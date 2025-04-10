import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import { CheckCircle, XCircle } from "react-feather";

// CSS styles for the app
const styles = `
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #1e1e1e;
    color: #f0f0f0;
  }

  .workflow-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    padding: 15px 20px;
    background-color: #2d2d2d;
    border-bottom: 1px solid #444;
  }

  .header h1 {
    margin: 0;
    font-size: 1.8rem;
  }

  .controls-container {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    background-color: #333;
  }

  .button {
    padding: 8px 16px;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
  }

  .button:hover {
    background-color: #0055aa;
  }

  .flow-container {
    flex-grow: 1;
    height: calc(100% - 130px);
  }

  .custom-node {
    padding: 10px;
    border-radius: 5px;
    background-color: #2d2d2d;
    color: white;
    border: 1px solid #555;
    width: 220px;
  }

  .node-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .node-title {
    font-weight: bold;
    font-size: 16px;
    margin: 0;
  }

  .node-badge {
    background-color: #444;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
  }

  .in-progress {
    background-color: #ff8c00;
    color: black;
  }

  .outreach {
    background-color: #6a5acd;
    color: white;
  }

  .node-description {
    font-size: 12px;
    color: #ccc;
    margin: 8px 0;
  }

  .node-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .node-type {
    background-color: #333;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    text-transform: uppercase;
  }

  .trigger {
    border-left: 4px solid #ff00ff;
  }

  .condition {
    border-left: 4px solid #00ff00;
  }

  .sequence {
    border-left: 4px solid #0088ff;
  }

  .completed-icon {
    color: #22cc22;
  }

  .not-completed-icon {
    color: #ff4444;
  }

  .minimap {
    background-color: #333;
  }

  .react-flow__minimap-mask {
    fill: rgba(255, 255, 255, 0.1);
  }

  .react-flow__edge-path {
    stroke-width: 2;
  }

  .react-flow__node-default {
    background-color: transparent;
    border: none;
    width: auto;
    height: auto;
    border-radius: 0;
  }

  .react-flow__handle {
    background-color: #555;
    width: 8px;
    height: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #2d2d2d;
  }

  th, td {
    border: 1px solid #444;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #333;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #333;
  }

  .table-container {
    padding: 20px;
    overflow: auto;
    max-height: calc(100vh - 180px);
  }

  .view-buttons {
    display: flex;
    gap: 10px;
  }

  .view-button {
    padding: 8px 16px;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .view-button.active {
    background-color: #0066cc;
  }
`;

// Custom Node Component
const CustomNode = ({ data }) => {
  const badgeClass = data.badge.toLowerCase().replace(" ", "-");

  return (
    <div className={`custom-node ${data.nodeType}`}>
      <div className="node-header">
        <h3 className="node-title">{data.label}</h3>
        {data.badge && (
          <span className={`node-badge ${badgeClass}`}>{data.badge}</span>
        )}
      </div>
      <div className="node-description">{data.description}</div>
      <div className="node-footer">
        <div className="node-type">{data.nodeType}</div>
        <div>
          {data.completed ? (
            <CheckCircle size={18} className="completed-icon" />
          ) : (
            <XCircle size={18} className="not-completed-icon" />
          )}
        </div>
      </div>
    </div>
  );
};

// Node types definition
const nodeTypes = {
  customNode: CustomNode,
};

// Initial nodes data
const initialNodes = [
  {
    id: "1",
    type: "customNode",
    data: {
      label: "Start",
      description: "Defines the beginning of the workflow sequence",
      badge: "In Progress",
      completed: false,
      nodeType: "trigger",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "customNode",
    data: {
      label: "Executor",
      description: "Executes shell commands, scripts, or functions",
      badge: "",
      completed: true,
      nodeType: "condition",
    },
    position: { x: -350, y: 180 },
  },
  {
    id: "3",
    type: "customNode",
    data: {
      label: "Code Review",
      description: "Approve, request changes, or reject code changes",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: 350, y: 180 },
  },
  {
    id: "4",
    type: "customNode",
    data: {
      label: "Decision",
      description: "Can chain multiple decisions for complex logic",
      badge: "Outreach",
      completed: true,
      nodeType: "sequence",
    },
    position: { x: -550, y: 360 },
  },
  {
    id: "5",
    type: "customNode",
    data: {
      label: "Product Review",
      description: "Product manager evaluates features before sign-off",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: -350, y: 360 },
  },
  {
    id: "6",
    type: "customNode",
    data: {
      label: "Lambda Functions",
      description: "Can be written in supported scripting languages",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: 0, y: 360 },
  },
  {
    id: "7",
    type: "customNode",
    data: {
      label: "Script Execution",
      description: "Perform file operations via Bash commands",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: 250, y: 360 },
  },
  {
    id: "8",
    type: "customNode",
    data: {
      label: "Transform",
      description: "Normalizes inconsistent data structures",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: 470, y: 360 },
  },
  {
    id: "9",
    type: "customNode",
    data: {
      label: "Transform",
      description: "Normalizes inconsistent data structures",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: -100, y: 540 },
  },
  {
    id: "10",
    type: "customNode",
    data: {
      label: "Generate Report",
      description: "Generate weekly analytics in CSV for business review",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: 100, y: 540 },
  },
  {
    id: "11",
    type: "customNode",
    data: {
      label: "Webhook",
      description: "Receives incoming POST/GET requests with payloads",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: -550, y: 540 },
  },
  {
    id: "12",
    type: "customNode",
    data: {
      label: "Authorization",
      description: "Validates user credentials and permissions",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: -750, y: 720 },
  },
  {
    id: "13",
    type: "customNode",
    data: {
      label: "Feedback",
      description: "Collects user feedback for product improvement",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: -450, y: 720 },
  },
  {
    id: "14",
    type: "customNode",
    data: {
      label: "UI Analysis",
      description: "Analyzes user interaction with UI elements",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: -150, y: 720 },
  },
  {
    id: "15",
    type: "customNode",
    data: {
      label: "Retry Logic",
      description: "Handling retry mechanisms for failed operations",
      badge: "Outreach",
      completed: false,
      nodeType: "sequence",
    },
    position: { x: 150, y: 720 },
  },
];

// Initial edges with explicitly defined marker ends for proper arrow rendering
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#ff00ff" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#ff00ff",
    },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    style: { stroke: "#ff0000" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#ff0000",
    },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
    style: { stroke: "#00ff00" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#00ff00",
    },
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    animated: true,
    style: { stroke: "#0000ff" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#0000ff",
    },
  },
  {
    id: "e2-6",
    source: "2",
    target: "6",
    animated: true,
    style: { stroke: "#ff8c00" },
    type: "smoothstep",
    label: "Enterprise lead",
    labelStyle: { fill: "#fff", fontWeight: "400" },
    labelBgStyle: { fill: "rgba(50, 50, 50, 0.9)" },
    labelShowBg: true,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#ff8c00",
    },
  },
  {
    id: "e3-7",
    source: "3",
    target: "7",
    animated: true,
    style: { stroke: "#9932cc" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#9932cc",
    },
  },
  {
    id: "e3-8",
    source: "3",
    target: "8",
    animated: true,
    style: { stroke: "#20b2aa" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#20b2aa",
    },
  },
  {
    id: "e4-11",
    source: "4",
    target: "11",
    animated: true,
    style: { stroke: "#1e90ff" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#1e90ff",
    },
  },
  {
    id: "e6-9",
    source: "6",
    target: "9",
    animated: true,
    style: { stroke: "#32cd32" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#32cd32",
    },
  },
  {
    id: "e6-10",
    source: "6",
    target: "10",
    animated: true,
    style: { stroke: "#ff1493" },
    type: "smoothstep",
    label: "SMB lead",
    labelStyle: { fill: "#fff", fontWeight: "400" },
    labelBgStyle: { fill: "rgba(50, 50, 50, 0.9)" },
    labelShowBg: true,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#ff1493",
    },
  },
  {
    id: "e11-13",
    source: "11",
    target: "13",
    animated: true,
    style: { stroke: "#ff4500" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#ff4500",
    },
  },
  {
    id: "e11-12",
    source: "11",
    target: "12",
    animated: true,
    style: { stroke: "#800080" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#800080",
    },
  },
  {
    id: "e11-14",
    source: "11",
    target: "14",
    animated: true,
    style: { stroke: "#008080" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#008080",
    },
  },
  {
    id: "e11-15",
    source: "11",
    target: "15",
    animated: true,
    style: { stroke: "#8b4513" },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#8b4513",
    },
  },
];

// Table data based on the image
const tableData = [
  {
    id: 1,
    label: "Start",
    nodeType: "Trigger",
    description: "Defines the beginning of the workflow sequence",
    completed: false,
    badge: "In Progress",
    dependsOn: "—",
  },
  {
    id: 2,
    label: "Executor",
    nodeType: "Condition",
    description: "Executes shell commands, scripts, or functions",
    completed: true,
    badge: "—",
    dependsOn: "1",
  },
  {
    id: 3,
    label: "Code Review",
    nodeType: "Sequence",
    description: "Approve, request changes, or reject code changes",
    completed: false,
    badge: "Outreach",
    dependsOn: "1",
  },
  {
    id: 4,
    label: "Decision",
    nodeType: "Sequence",
    description: "Can chain multiple decisions for complex logic",
    completed: true,
    badge: "Outreach",
    dependsOn: "2",
  },
  {
    id: 5,
    label: "Product Review",
    nodeType: "Sequence",
    description: "Product manager evaluates features before sign-off",
    completed: false,
    badge: "Outreach",
    dependsOn: "2",
  },
  {
    id: 6,
    label: "Lambda Functions",
    nodeType: "Sequence",
    description: "Can be written in supported scripting languages",
    completed: false,
    badge: "Outreach",
    dependsOn: "2",
  },
  {
    id: 7,
    label: "Script Execution",
    nodeType: "Sequence",
    description: "Perform file operations via Bash commands",
    completed: false,
    badge: "Outreach",
    dependsOn: "3",
  },
  {
    id: 8,
    label: "Transform",
    nodeType: "Sequence",
    description: "Normalizes inconsistent data structures",
    completed: false,
    badge: "Outreach",
    dependsOn: "3",
  },
  {
    id: 9,
    label: "Transform",
    nodeType: "Sequence",
    description: "Normalizes inconsistent data structures",
    completed: false,
    badge: "Outreach",
    dependsOn: "6",
  },
  {
    id: 10,
    label: "Generate Report",
    nodeType: "Sequence",
    description: "Generate weekly analytics in CSV for business review",
    completed: false,
    badge: "Outreach",
    dependsOn: "6",
  },
  {
    id: 11,
    label: "Webhook",
    nodeType: "Sequence",
    description: "Receives incoming POST/GET requests with payloads",
    completed: false,
    badge: "Outreach",
    dependsOn: "4",
  },
  {
    id: 12,
    label: "Authorization",
    nodeType: "Sequence",
    description: "Validates user credentials and permissions",
    completed: false,
    badge: "Outreach",
    dependsOn: "11",
  },
  {
    id: 13,
    label: "Feedback",
    nodeType: "Sequence",
    description: "Collects user feedback for product improvement",
    completed: false,
    badge: "Outreach",
    dependsOn: "11",
  },
  {
    id: 14,
    label: "UI Analysis",
    nodeType: "Sequence",
    description: "Analyzes user interaction with UI elements",
    completed: false,
    badge: "Outreach",
    dependsOn: "11",
  },
  {
    id: 15,
    label: "Retry Logic",
    nodeType: "Sequence",
    description: "Handling retry mechanisms for failed operations",
    completed: false,
    badge: "Outreach",
    dependsOn: "11",
  },
];

// Dagre graph layout utility function
const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  // Set nodes
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 250, height: 100 });
  });

  // Set edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply layout to nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 125, // half of the node width
        y: nodeWithPosition.y - 50, // half of the node height
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

// Main App Component
function WorkflowApp() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [view, setView] = useState("flow"); // 'flow' or 'table'

  // Initialize with layout
  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, []);

  // Handle edge connections
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#aaa" },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#aaa",
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Layout button handler
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges]
  );

  return (
    <div className="workflow-container">
      <style>{styles}</style>
      <div className="header">
        <h1>Workflow Visualization</h1>
      </div>

      <div className="controls-container">
        <div className="view-buttons">
          <button
            className={`view-button ${view === "flow" ? "active" : ""}`}
            onClick={() => setView("flow")}
          >
            Flow View
          </button>
          <button
            className={`view-button ${view === "table" ? "active" : ""}`}
            onClick={() => setView("table")}
          >
            Table View
          </button>
        </div>

        {view === "flow" && (
          <>
            <button className="button" onClick={() => onLayout("TB")}>
              Vertical Layout
            </button>
            <button className="button" onClick={() => onLayout("LR")}>
              Horizontal Layout
            </button>
          </>
        )}
      </div>

      {view === "flow" ? (
        <div className="flow-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap
              className="minimap"
              nodeStrokeWidth={3}
              zoomable
              pannable
            />
            <Background color="#444" gap={16} />
          </ReactFlow>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Completed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>{row.label}</td>
                  <td>{row.description}</td>
                  <td>
                    {row.completed ? (
                      <CheckCircle size={18} className="completed-icon" />
                    ) : (
                      <XCircle size={18} className="not-completed-icon" />
                    )}
                  </td>
                  <td>{row.badge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WorkflowApp;
