const { Router } = require("express");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");
const { authenticated } = require("../../../common/middlewares/authenticated");
const { verified } = require("../../../common/middlewares/verified");
const { hasRole } = require("../../../common/middlewares/hasRole");
const { getOrders } = require("./controllers");
const adminOrderRouter = Router();

adminOrderRouter.use(validateApiKey, authenticated, verified, hasRole("admin"));

adminOrderRouter.get("/", getOrders);

module.exports = {
  adminOrderRouter,
};
