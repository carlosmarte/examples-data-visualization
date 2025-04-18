export const initialNodes = [
  {
    id: "1",
    type: "triggerNode",
    data: {
      label: "Start",
      description: "Defines the beginning of the workflow sequence",
      badge: "In Progress",
      completed: false,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "conditionNode",
    data: {
      label: "Executor",
      description: "Executes shell commands, scripts, or functions",
      badge: "",
      completed: true,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "3",
    type: "sequenceNode",
    data: {
      label: "Code Review",
      description: "Approve, request changes, or reject code changes",
      badge: "Outreach",
      completed: false,
      icon: "📝",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "4",
    type: "sequenceNode",
    data: {
      label: "Decision",
      description: "Can chain multiple decisions for complex logic",
      badge: "Outreach",
      completed: true,
      icon: "🔀",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "5",
    type: "sequenceNode",
    data: {
      label: "Product Review",
      description: "Product manager evaluates features before sign-off",
      badge: "Outreach",
      completed: false,
      icon: "👁️",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "6",
    type: "sequenceNode",
    data: {
      label: "Lambda Functions",
      description: "Can be written in supported scripting languages",
      badge: "Outreach",
      completed: false,
      icon: "λ",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "7",
    type: "sequenceNode",
    data: {
      label: "Script Execution",
      description: "Perform file operations via Bash commands",
      badge: "Outreach",
      completed: false,
      icon: "🖥️",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "8",
    type: "sequenceNode",
    data: {
      label: "Transform",
      description: "Normalizes inconsistent data structures",
      badge: "Outreach",
      completed: false,
      icon: "⚙️",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "9",
    type: "sequenceNode",
    data: {
      label: "Transform",
      description: "Normalizes inconsistent data structures",
      badge: "Outreach",
      completed: false,
      icon: "⚙️",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "10",
    type: "sequenceNode",
    data: {
      label: "Generate Report",
      description: "Generate weekly analytics in CSV for business review",
      badge: "Outreach",
      completed: false,
      icon: "📊",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "11",
    type: "sequenceNode",
    data: {
      label: "Webhook",
      description: "Receives incoming POST/GET requests with payloads",
      badge: "Outreach",
      completed: false,
      icon: "🔗",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "12",
    type: "sequenceNode",
    data: {
      label: "Authorization",
      description: "Validates user credentials and permissions",
      badge: "Outreach",
      completed: false,
      icon: "🔒",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "13",
    type: "sequenceNode",
    data: {
      label: "Feedback",
      description: "Collects user feedback for product improvement",
      badge: "Outreach",
      completed: false,
      icon: "💬",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "14",
    type: "sequenceNode",
    data: {
      label: "UI Analysis",
      description: "Collects user feedback for product improvement",
      badge: "Outreach",
      completed: false,
      icon: "👁️",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "15",
    type: "sequenceNode",
    data: {
      label: "Retry Logic",
      description: "Handling retry mechanisms for failed operations",
      badge: "Outreach",
      completed: false,
      icon: "🔄",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "16",
    type: "sequenceNode",
    data: {
      label: "Scheduler",
      description: "Schedules tasks to run at specific times",
      badge: "Outreach",
      completed: false,
      icon: "⏱️",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "17",
    type: "sequenceNode",
    data: {
      label: "Task Status",
      description: "Monitors and reports on task execution status",
      badge: "Outreach",
      completed: false,
      icon: "📊",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "18",
    type: "sequenceNode",
    data: {
      label: "Error Handling",
      description: "Manages error responses and recovery strategies",
      badge: "Outreach",
      completed: false,
      icon: "⚠️",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "19",
    type: "sequenceNode",
    data: {
      label: "Database",
      description: "Handles database operations and data persistence",
      badge: "Outreach",
      completed: false,
      icon: "💾",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "20",
    type: "sequenceNode",
    data: {
      label: "Form",
      description: "Manages form validation and submission",
      badge: "Outreach",
      completed: false,
      icon: "📝",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "21",
    type: "sequenceNode",
    data: {
      label: "Component",
      description: "Reusable UI components for consistent interfaces",
      badge: "Outreach",
      completed: false,
      icon: "🧩",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "22",
    type: "sequenceNode",
    data: {
      label: "Automation",
      description: "Automates routine tasks and workflows",
      badge: "Outreach",
      completed: false,
      icon: "🤖",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "23",
    type: "sequenceNode",
    data: {
      label: "Project",
      description: "Manages project timelines and deliverables",
      badge: "Outreach",
      completed: false,
      icon: "📋",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "24",
    type: "sequenceNode",
    data: {
      label: "Loop",
      description: "Implements iteration for repetitive operations",
      badge: "Outreach",
      completed: false,
      icon: "♻️",
    },
    position: { x: 0, y: 0 },
  },
];

// Enhanced edges data with distribution option
export const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
  },
  {
    id: "e2-6",
    source: "2",
    target: "6",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    label: "Enterprise lead",
    labelStyle: { fill: "#666", fontWeight: "400" },
    labelBgStyle: { fill: "rgba(255, 255, 255, 0.9)" },
    labelShowBg: true,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
  },
  {
    id: "e3-7",
    source: "3",
    target: "7",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
  },
  {
    id: "e3-8",
    source: "3",
    target: "8",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
  },
  {
    id: "e4-11",
    source: "4",
    target: "11",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag for this connection
  },
  {
    id: "e6-9",
    source: "6",
    target: "9",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
  },
  {
    id: "e6-10",
    source: "6",
    target: "10",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    label: "SMB lead",
    labelStyle: { fill: "#666", fontWeight: "400" },
    labelBgStyle: { fill: "rgba(255, 255, 255, 0.9)" },
    labelShowBg: true,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
  },
  {
    id: "e11-13",
    source: "11",
    target: "13",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-12",
    source: "11",
    target: "12",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-14",
    source: "11",
    target: "14",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-15",
    source: "11",
    target: "15",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-16",
    source: "11",
    target: "16",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-17",
    source: "11",
    target: "17",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-18",
    source: "11",
    target: "18",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-19",
    source: "11",
    target: "19",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-20",
    source: "11",
    target: "20",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-21",
    source: "11",
    target: "21",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-22",
    source: "11",
    target: "22",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-23",
    source: "11",
    target: "23",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
  {
    id: "e11-24",
    source: "11",
    target: "24",
    animated: true,
    className: "animated-edge",
    style: { stroke: "#10b981" },
    type: "smoothstep",
    data: { distribute: true }, // Add distribution flag
  },
];
