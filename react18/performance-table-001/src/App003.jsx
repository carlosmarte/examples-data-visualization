// App.jsx
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SalesDashboard from "./Example003";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    success: {
      main: "#4caf50",
    },
    warning: {
      main: "#ff9800",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SalesDashboard />
    </ThemeProvider>
  );
}

export default App;
