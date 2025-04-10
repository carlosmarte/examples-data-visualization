import React, { memo, useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Panel,
  Handle,
  Position,
  useReactFlow,
  useStoreApi,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import * as icons from "lucide-react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import dagre from "dagre";

// Configuration object for the application
const appConfig = {
  layouts: [
    // { id: "TB", label: "Vertical Layout", default: true },
    // { id: "LR", label: "Horizontal Layout", default: false },
    // { id: "RL", label: "Right to Left", default: false },
    // { id: "BT", label: "Bottom to Top", default: false },
  ],
  nodeSpacing: {
    horizontal: 100, // Space between nodes horizontally (nodesep)
    vertical: 150, // Space between nodes vertically (ranksep)
    marginX: 50, // Margin on x-axis
    marginY: 50, // Margin on y-axis
  },
  nodeSize: {
    width: 270,
    height: 150,
  },
};

const WorkflowApp = () => {
  // Global styles
  const globalStyles = `
    html, body, #root {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    * {
      box-sizing: border-box;
    }

    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      overflow: hidden;
    }

    .app-header {
      background-color: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
      padding: 12px 24px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      z-index: 10;
    }
    
    .app-title {
      font-size: 18px;
      font-weight: 600;
      color: #374151;
      margin: 0;
    }
    
    .app-content {
      flex: 1;
      position: relative;
      height: calc(100vh - 53px);
    }
    
    .flow-container {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    
    .control-panel {
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 15px;
      margin: 10px;
      z-index: 5;
    }
    
    .panel-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .panel-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #374151;
    }
    
    .panel-section {
      margin-top: 15px;
    }
    
    .panel-section-title {
      font-size: 14px;
      font-weight: 500;
      margin: 0 0 8px 0;
      color: #4b5563;
    }
    
    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .layout-button {
      background-color: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      padding: 6px 10px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .layout-button:hover {
      background-color: #e5e7eb;
    }
    
    .layout-button.active {
      background-color: #3b82f6;
      color: white;
      border-color: #2563eb;
    }
    
    .export-button {
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-top: 10px;
    }
    
    .export-button:hover {
      background-color: #2563eb;
    }
    
    .node-container {
      width: 260px;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      background-color: white;
      border: 1px solid #e5e7eb;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: box-shadow 0.2s, transform 0.2s;
      position: relative;
    }
    
    .node-container:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    
    .trigger-node {
      border-left: 4px solid #3b82f6;
    }
    
    .condition-node {
      border-left: 4px solid #f59e0b;
    }
    
    .sequence-node {
      border-left: 4px solid #10b981;
    }
    
    .node-header {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .node-icon {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      margin-right: 8px;
    }
    
    .trigger-icon {
      background-color: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }
    
    .condition-icon {
      background-color: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
    }
    
    .sequence-icon {
      background-color: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }
    
    .node-title {
      font-weight: 600;
      font-size: 14px;
      color: #374151;
      flex: 1;
    }
    
    .node-badge {
      font-size: 11px;
      font-weight: 500;
      color: #6b7280;
      padding: 2px 8px;
      background-color: #f3f4f6;
      border-radius: 4px;
    }
    
    .node-content {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 12px;
      flex: 1;
    }
    
    .node-content p {
      margin: 0;
      line-height: 1.5;
    }
    
    .completion-badge {
      font-size: 11px;
      font-weight: 500;
      color: #10b981;
    }
    
    .completed {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      background-color: rgba(16, 185, 129, 0.1);
      border-radius: 4px;
    }
    
    .handle-top, .handle-bottom, .handle-left, .handle-right {
      width: 10px;
      height: 10px;
      background-color: #10b981;
      border: 2px solid white;
      border-radius: 50%;
    }
    
    .handle-top {
      top: -6px;
    }
    
    .handle-bottom {
      bottom: -6px;
    }
    
    .handle-left {
      left: -6px;
    }
    
    .handle-right {
      right: -6px;
    }
    
    .animated-edge {
      stroke-width: 2;
    }
    
    .services-container {
      width: 220px;
      border-radius: 6px;
      padding: 16px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      background-color: white;
    }
    
    .services-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .service-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
      padding-bottom: 8px;
    }
    
    .service-item.with-border {
      border-bottom: 1px solid #d1d5db;
    }
    
    .service-name {
      font-weight: normal;
      font-size: 14px;
      color: #374151;
    }
    
    .status-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .count-text {
      font-size: 12px;
      color: #6b7280;
    }
  `;

  // Initial nodes with icon names that match Lucide component names
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
        icon: "Settings",
        cssStyle: {
          borderLeft: "4px solid blue",
          borderRight: "4px solid blue",
        },
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
        icon: "AlertTriangle",
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
        icon: "FileCheck",
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
        icon: "GitBranch",
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
        icon: "Eye",
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
        icon: "Code",
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
        icon: "Terminal",
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
        icon: "Settings",
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
        icon: "Settings",
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
        icon: "BarChart2",
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
        icon: "Link",
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
        icon: "LockKeyhole",
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
        icon: "MessageSquare",
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
        icon: "Eye",
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
        icon: "RefreshCw",
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
      sourceHandle: "bottom",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#ff00ff", strokeWidth: 2 },
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
      sourceHandle: "right",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#ff0000", strokeWidth: 2 },
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
      sourceHandle: "bottom",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#00ff00", strokeWidth: 2 },
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
      sourceHandle: "bottom",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#0000ff", strokeWidth: 2 },
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
      sourceHandle: "right",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#ff8c00", strokeWidth: 2 },
      type: "smoothstep",
      label: "Enterprise lead",
      labelStyle: { fill: "#666", fontWeight: "400" },
      labelBgStyle: { fill: "rgba(255, 255, 255, 0.9)" },
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
      sourceHandle: "bottom",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#9932cc", strokeWidth: 2 },
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
      sourceHandle: "right",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#20b2aa", strokeWidth: 2 },
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
      sourceHandle: "bottom",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#1e90ff", strokeWidth: 2 },
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
      sourceHandle: "bottom",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#32cd32", strokeWidth: 2 },
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
      sourceHandle: "right",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#ff1493", strokeWidth: 2 },
      type: "smoothstep",
      label: "SMB lead",
      labelStyle: { fill: "#666", fontWeight: "400" },
      labelBgStyle: { fill: "rgba(255, 255, 255, 0.9)" },
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
      sourceHandle: "bottom",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#ff4500", strokeWidth: 2 },
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
      sourceHandle: "bottom",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#800080", strokeWidth: 2 },
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
      sourceHandle: "right",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#008080", strokeWidth: 2 },
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
      sourceHandle: "right",
      targetHandle: "top",
      animated: true,
      style: { stroke: "#8b4513", strokeWidth: 2 },
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#8b4513",
      },
    },
  ];

  // Custom node component with all four connection points
  const CustomNode = memo(({ data, isConnectable }) => {
    // Determine the node type styling
    const getNodeClassForType = () => {
      switch (data.nodeType) {
        case "trigger":
          return "trigger-node";
        case "condition":
          return "condition-node";
        default:
          return "sequence-node";
      }
    };

    // Determine the icon class based on node type
    const getIconClassForType = () => {
      switch (data.nodeType) {
        case "trigger":
          return "trigger-icon";
        case "condition":
          return "condition-icon";
        default:
          return "sequence-icon";
      }
    };

    // Dynamically render the icon using the icon name from data
    const IconComponent = icons[data.icon];

    return (
      <div
        className={`node-container ${getNodeClassForType()}`}
        style={data.cssStyle}
      >
        <div className="node-header">
          <div className={`node-icon ${getIconClassForType()}`}>
            {IconComponent && <IconComponent size={16} />}
          </div>
          <div className="node-title">{data.label}</div>
          {data.badge && <div className="node-badge">{data.badge}</div>}
        </div>
        <div className="node-content">
          <p>{data.description}</p>
        </div>
        <div className="completion-badge">
          {data.completed && <span className="completed">✓ Completed</span>}
        </div>

        {/* Handle for top side */}
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          isConnectable={isConnectable}
          className="handle-top"
        />

        {/* Handle for bottom side */}
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          isConnectable={isConnectable}
          className="handle-bottom"
        />

        {/* Handle for left side */}
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          isConnectable={isConnectable}
          className="handle-left"
        />

        {/* Handle for right side */}
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          isConnectable={isConnectable}
          className="handle-right"
        />
      </div>
    );
  });

  const ServicesTable = () => {
    const services = [
      {
        name: "Endpoint Security",
        status: "complete",
        count: "1/14",
      },
      {
        name: "Cyber Warranty",
        status: "warning",
        count: null,
      },
    ];

    return (
      <div className="services-container">
        <div className="services-list">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={
                index !== services.length - 1
                  ? "service-item with-border"
                  : "service-item"
              }
            >
              <span className="service-name">{service.name}</span>
              <div className="status-container">
                {service.count && (
                  <span className="count-text">{service.count}</span>
                )}
                {service.status === "complete" ? (
                  <CheckCircle color="#16a34a" size={20} />
                ) : (
                  <AlertTriangle color="#f59e0b" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Layout Configuration Panel Component
  const LayoutControls = ({ onLayoutChange, activeLayout }) => {
    return (
      <div className="panel-section">
        <h4 className="panel-section-title">Layout Options</h4>
        <div className="button-group">
          {appConfig.layouts.map((layout) => (
            <button
              key={layout.id}
              className={`layout-button ${
                activeLayout === layout.id ? "active" : ""
              }`}
              onClick={() => onLayoutChange(layout.id)}
            >
              {layout.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Flow Diagram Component
  const FlowDiagram = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [activeLayout, setActiveLayout] = useState(
      appConfig.layouts.find((l) => l.default)?.id || "TB"
    );
    const reactFlowInstance = useReactFlow();
    const store = useStoreApi();

    // Define nodeTypes within the component scope
    const nodeTypes = {
      customNode: CustomNode,
    };

    // Create a layout using dagre
    const getLayoutedElements = (nodes, edges, direction = "TB") => {
      // Create a new directed graph
      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));

      // Set graph configuration from appConfig
      dagreGraph.setGraph({
        rankdir: direction,
        nodesep: appConfig.nodeSpacing.horizontal,
        ranksep: appConfig.nodeSpacing.vertical,
        marginx: appConfig.nodeSpacing.marginX,
        marginy: appConfig.nodeSpacing.marginY,
      });

      // Add nodes to the dagre graph
      nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
          width: appConfig.nodeSize.width,
          height: appConfig.nodeSize.height,
        });
      });

      // Add edges to the dagre graph
      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      // Calculate layout
      dagre.layout(dagreGraph);

      // Get the calculated positions and apply them to the nodes
      const layoutedNodes = nodes.map((node) => {
        const dagreNode = dagreGraph.node(node.id);

        return {
          ...node,
          position: {
            x: dagreNode.x - appConfig.nodeSize.width / 2,
            y: dagreNode.y - appConfig.nodeSize.height / 2,
          },
        };
      });

      return { nodes: layoutedNodes, edges };
    };

    // Handle connections between nodes
    const onConnect = useCallback(
      (params) => {
        // Default to bottom-top connection if handles not specified
        const connection = {
          ...params,
          sourceHandle: params.sourceHandle || "bottom",
          targetHandle: params.targetHandle || "top",
          animated: true,
          style: { stroke: "#10b981", strokeWidth: 2 },
          type: "smoothstep",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#10b981",
          },
        };

        // Add the new edge
        const newEdges = addEdge(connection, edges);
        setEdges(newEdges);

        // Re-layout the graph with the new edge
        const { nodes: layoutedNodes } = getLayoutedElements(
          nodes,
          newEdges,
          activeLayout
        );
        setNodes(layoutedNodes);
      },
      [edges, nodes, setEdges, setNodes, activeLayout]
    );

    const onLayoutChange = useCallback(
      (direction) => {
        setActiveLayout(direction);

        const { nodes: layoutedNodes, edges: layoutedEdges } =
          getLayoutedElements(nodes, edges, direction);

        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);

        // Center the graph after layout
        window.requestAnimationFrame(() => {
          reactFlowInstance.fitView({ padding: 0.2 });
        });
      },
      [nodes, edges, setNodes, setEdges, reactFlowInstance]
    );

    const onExport = useCallback(() => {
      const { nodes, edges } = store.getState();
      console.log({
        nodes,
        edges,
        stringify: {
          node: JSON.stringify(nodes),
          edge: JSON.stringify(edges),
        },
      });
    }, [store]);

    // Initialize with the predefined nodes and edges
    useEffect(() => {
      // Find default layout direction from config
      const defaultLayout =
        appConfig.layouts.find((l) => l.default)?.id || "TB";

      // Apply dagre layout to the initial nodes and edges
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(initialNodes, initialEdges, defaultLayout);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setActiveLayout(defaultLayout);

      // Fit view after initialization
      const timeoutId = setTimeout(() => {
        if (reactFlowInstance) {
          reactFlowInstance.fitView({ padding: 0.2 });
        }
      }, 200);

      return () => clearTimeout(timeoutId);
    }, [reactFlowInstance, setNodes, setEdges]);

    return (
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          style={{ width: "100%", height: "100%" }}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "#10b981", strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "#10b981",
            },
          }}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />

          <Panel position="top-right" className="control-panel">
            <div className="panel-actions">
              <h3 className="panel-title">Services</h3>
              <ServicesTable />

              {/* Layout controls from configuration */}
              {/* <LayoutControls
                onLayoutChange={onLayoutChange}
                activeLayout={activeLayout}
              /> */}

              <button
                className="export-button"
                onClick={onExport}
                style={{ marginTop: 15 }}
              >
                Export
              </button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    );
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Workflow Visualization</h1>
        </header>
        <main className="app-content">
          <ReactFlowProvider>
            <FlowDiagram />
          </ReactFlowProvider>
        </main>
      </div>
    </>
  );
};

export default WorkflowApp;
