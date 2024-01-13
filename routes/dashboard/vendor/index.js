const { Router } = require("express");
const {
  getOverview,
  getSalesAnalysis,
  getTopSales,
  recentOrders,
  getBalance,
  getOrdersStatus,
} = require("./controllers");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");
const { authenticated } = require("../../../common/middlewares/authenticated");
const { verified } = require("../../../common/middlewares/verified");
const { hasRole } = require("../../../common/middlewares/hasRole");

const vendorDashboardRouter = Router();

vendorDashboardRouter.use(
  validateApiKey,
  authenticated,
  verified,
  hasRole("vendor"),
);

vendorDashboardRouter.get("/overview", getOverview);
vendorDashboardRouter.get("/sales-analysis", getSalesAnalysis);
vendorDashboardRouter.get("/top-sales", getTopSales);
vendorDashboardRouter.get("/recent-orders", recentOrders);
vendorDashboardRouter.get("/balance", getBalance);
vendorDashboardRouter.get("/orders", getOrdersStatus);

module.exports = { vendorDashboardRouter };
