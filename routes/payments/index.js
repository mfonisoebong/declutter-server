const { Router } = require("express");
const { validateApiKey } = require("../../common/middlewares/validateApiKey");
const { authenticated } = require("../../common/middlewares/authenticated");
const { verified } = require("../../common/middlewares/verified");
const { hasRole } = require("../../common/middlewares/hasRole");
const { verifyPayment } = require("./controllers");
const paymentsRouter = Router();

paymentsRouter.use(validateApiKey, authenticated, verified, hasRole("vendor"));

paymentsRouter.post("/verify/:id", verifyPayment);
module.exports = {
  paymentsRouter,
};
