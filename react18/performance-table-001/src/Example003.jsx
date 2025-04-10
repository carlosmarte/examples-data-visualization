// SalesDashboard.jsx
import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import {
  LocalOffer as PromotionIcon,
  Business as CompetitorsIcon,
  Person as ConsumerIcon,
  Image as SalesIcon,
  AttachMoney as RevenueIcon,
  TrendingUp as GrowthIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: "100%",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
}));

const StyledCircularProgress = styled(CircularProgress)(({ color }) => ({
  color: color,
  height: "120px !important",
  width: "120px !important",
}));

const StatCard = ({ icon, title, value, period, change, changeColor }) => {
  // Determine color for change percentage
  let color = "#9e9e9e"; // Default gray
  if (changeColor === "auto") {
    color = change > 0 ? "#4caf50" : change < 0 ? "#f44336" : "#9e9e9e";
  } else {
    color = changeColor;
  }

  // Icon mapping
  const IconComponent = icon;

  return (
    <StyledPaper>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconComponent sx={{ fontSize: 32, color: "#3f51b5" }} />
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {value}
          </Typography>
        </Box>

        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>

        <Divider />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {period}
          </Typography>
          <Typography variant="body1" sx={{ color, fontWeight: "medium" }}>
            {change > 0 ? "+" : ""}
            {change}%
          </Typography>
        </Box>
      </Stack>
    </StyledPaper>
  );
};

const CircularProgressWithLabel = ({ value, color }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <StyledCircularProgress
        variant="determinate"
        value={value}
        color={color}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const ProductStockCard = ({ product, stockPercentage, color }) => {
  return (
    <StyledPaper>
      <Stack spacing={2} alignItems="center">
        <CircularProgressWithLabel value={stockPercentage} color={color} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {product}
        </Typography>
      </Stack>
    </StyledPaper>
  );
};

const SalesDashboard = () => {
  return (
    <Box
      sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}
    >
      <Grid container spacing={3}>
        {/* Total Sales Header */}
        <Grid item xs={12}>
          <Card
            sx={{
              mb: 3,
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Sales
              </Typography>
              <Typography
                variant="h3"
                component="div"
                sx={{ fontWeight: "bold", color: "#1a237e" }}
              >
                $4,765
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Product Stock Cards - First Row */}
        <Grid item xs={12} md={3}>
          <ProductStockCard
            product="Product 1 - Stock"
            stockPercentage={95}
            color="success"
          />
        </Grid>

        {/* Stat Cards - First Row */}
        <Grid item xs={12} md={3}>
          <StatCard
            icon={PromotionIcon}
            title="Promotion"
            value="1,985"
            period="Last 12 months"
            change={16}
            changeColor="#4caf50"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            icon={CompetitorsIcon}
            title="Competitors"
            value="854"
            period="Last 12 months"
            change={9}
            changeColor="#4caf50"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            icon={ConsumerIcon}
            title="Consumer"
            value="300"
            period="Last 12 months"
            change={-4}
            changeColor="#f44336"
          />
        </Grid>

        {/* Product Stock Cards - Second Row */}
        <Grid item xs={12} md={3}>
          <ProductStockCard
            product="Product 2 - Stock"
            stockPercentage={50}
            color="warning"
          />
        </Grid>

        {/* Stat Cards - Second Row */}
        <Grid item xs={12} md={3}>
          <StatCard
            icon={SalesIcon}
            title="Sales"
            value="3,977"
            period="Last 12 months"
            change={-3}
            changeColor="#f44336"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            icon={RevenueIcon}
            title="Revenue"
            value="145"
            period="Last 12 months"
            change={5}
            changeColor="#4caf50"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            icon={GrowthIcon}
            title="Growth"
            value="594"
            period="Last 12 months"
            change={7}
            changeColor="#4caf50"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesDashboard;
