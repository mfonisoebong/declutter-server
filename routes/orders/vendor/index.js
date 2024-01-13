const { Router } = require("express");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");
const { authenticated } = require("../../../common/middlewares/authenticated");
const { verified } = require("../../../common/middlewares/verified");
const { hasRole } = require("../../../common/middlewares/hasRole");
const {
  getVendorOrders,
  confirmDelivery,
  cancelOrder,
  validateOrder,
  getOrder,
} = require("./controllers");

const vendorOrderRouter = Router();

vendorOrderRouter.use(
  validateApiKey,
  authenticated,
  verified,
  hasRole("vendor"),
);

vendorOrderRouter.get("/", getVendorOrders);
vendorOrderRouter.get("/:id", getOrder);

vendorOrderRouter.post("/:id/confirm", validateOrder, confirmDelivery);
vendorOrderRouter.post("/:id/cancel", validateOrder, cancelOrder);

module.exports = {
  vendorOrderRouter,
};
