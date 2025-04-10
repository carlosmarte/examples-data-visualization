// Example001.jsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

const ActivityLabel = ({ activity }) => {
  return (
    <Box
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography variant="h4" component="h2" sx={{ fontWeight: 300 }}>
        {activity}
      </Typography>
    </Box>
  );
};

const MetricCard = ({ value, isHighlighted, subtitle }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        bgcolor: isHighlighted ? "warning.main" : "background.paper",
      }}
    >
      {subtitle && (
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: "text.secondary",
            mb: 0.5,
          }}
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        variant="h4"
        component="div"
        sx={{
          fontWeight: 300,
          color: isHighlighted ? "warning.contrastText" : "text.primary",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const ScrollGauge = ({ value }) => {
  const theme = useTheme();
  const normalizedValue = (parseFloat(value.replace(",", ".")) / 10) * 100;

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        position: "relative",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={normalizedValue}
        size={80}
        thickness={4}
        sx={{
          color: theme.palette.warning.main,
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const HeaderColumn = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        p: 2,
        textAlign: "center",
        borderRight: (theme) =>
          subtitle ? `1px solid ${theme.palette.divider}` : "none",
      }}
    >
      <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

const Example001 = () => {
  // Sample data (matches the image)
  const dashboardData = {
    activity: "page002",
    metrics: {
      loadTime: "2,77s",
      sessions: "2,77s",
      bounceRate: "67,9%",
      scrollDepth: "4,53",
      conversionRate: "8,08%",
    },
  };

  return (
    <Card sx={{ maxWidth: 1100, mx: "auto", boxShadow: 3 }}>
      {/* Header Row */}
      <Grid
        container
        sx={{ bgcolor: "grey.100", borderBottom: 1, borderColor: "divider" }}
      >
        <Grid item xs={2}>
          <HeaderColumn title="ACTIVITY" />
        </Grid>
        <Grid item xs={2}>
          <HeaderColumn title="LOAD TIME" subtitle="(LCP)" />
        </Grid>
        <Grid item xs={2}>
          <HeaderColumn title="SESSIONS" subtitle="-SESSION" />
        </Grid>
        <Grid item xs={2}>
          <HeaderColumn title="BOUNCE" />
        </Grid>
        <Grid item xs={2}>
          <HeaderColumn title="SCROLL" />
        </Grid>
        <Grid item xs={2}>
          <HeaderColumn title="CONVERSION" />
        </Grid>
      </Grid>

      {/* Data Row */}
      <Grid container sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* Activity Label */}
        <Grid item xs={2} sx={{ borderRight: 1, borderColor: "divider" }}>
          <ActivityLabel activity={dashboardData.activity} />
        </Grid>

        {/* Load Time */}
        <Grid item xs={2} sx={{ borderRight: 1, borderColor: "divider" }}>
          <MetricCard
            value={dashboardData.metrics.loadTime}
            isHighlighted={true}
          />
        </Grid>

        {/* Sessions */}
        <Grid item xs={2} sx={{ borderRight: 1, borderColor: "divider" }}>
          <MetricCard value={dashboardData.metrics.sessions} />
        </Grid>

        {/* Bounce Rate */}
        <Grid item xs={2} sx={{ borderRight: 1, borderColor: "divider" }}>
          <MetricCard value={dashboardData.metrics.bounceRate} />
        </Grid>

        {/* Scroll Depth */}
        <Grid item xs={2} sx={{ borderRight: 1, borderColor: "divider" }}>
          <ScrollGauge value={dashboardData.metrics.scrollDepth} />
        </Grid>

        {/* Conversion Rate */}
        <Grid item xs={2}>
          <MetricCard value={dashboardData.metrics.conversionRate} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Example001;
