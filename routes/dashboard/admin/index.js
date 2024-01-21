const { Router } = require("express");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");
const { authenticated } = require("../../../common/middlewares/authenticated");
const { verified } = require("../../../common/middlewares/verified");
const { hasRole } = require("../../../common/middlewares/hasRole");
const {
  getOverview,
  getSalesAnalysis,
  getTopSales,
  recentOrders,
  getOrdersStatus,
} = require("./controllers");
const adminDashboardRouter = Router();

adminDashboardRouter.use(
  validateApiKey,
  authenticated,
  verified,
  hasRole("admin"),
);

adminDashboardRouter.get("/overview", getOverview);
adminDashboardRouter.get("/sales-analysis", getSalesAnalysis);
adminDashboardRouter.get("/top-sales", getTopSales);
adminDashboardRouter.get("/recent-orders", recentOrders);
adminDashboardRouter.get("/orders", getOrdersStatus);

module.exports = {
  adminDashboardRouter,
};
