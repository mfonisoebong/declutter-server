const { Router } = require("express");
const { getOverview } = require("./controllers");
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

module.exports = { vendorDashboardRouter };
