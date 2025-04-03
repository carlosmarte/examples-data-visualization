import React from "react";

// App.jsx
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material";

// theme.js
import { createTheme } from "@mui/material/styles";

const themeMaterialDesign = createTheme({
  palette: {
    primary: {
      main: "#1e293b",
      dark: "#0f172a",
      light: "#334155",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4682B4",
      dark: "#2c5282",
      light: "#63b3ed",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#F7941D",
      dark: "#c27013",
      light: "#ffb74d",
      contrastText: "#000000",
    },
    error: {
      main: "#ef4444",
    },
    success: {
      main: "#22c55e",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 300,
    },
    subtitle1: {
      fontWeight: 500,
    },
    caption: {
      fontSize: "0.75rem",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: "hidden",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#F7941D",
        },
      },
    },
  },
});

import Example001 from "./Example001.jsx";

function MaterialDesign() {
  return (
    <ThemeProvider theme={themeMaterialDesign}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Example001 />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default MaterialDesign;
