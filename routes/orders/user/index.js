const { Router } = require("express");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");
const { authenticated } = require("../../../common/middlewares/authenticated");
const { verified } = require("../../../common/middlewares/verified");
const { getOrders, getOrder } = require("./controllers");

const orderRouter = Router();

orderRouter.use(validateApiKey, authenticated, verified);

orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrder);

module.exports = {
  orderRouter,
};
