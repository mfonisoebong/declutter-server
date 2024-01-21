const { Router } = require("express");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");
const { authenticated } = require("../../../common/middlewares/authenticated");
const { verified } = require("../../../common/middlewares/verified");
const { hasRole } = require("../../../common/middlewares/hasRole");
const { getProducts } = require("./controllers");
const productAdminRouter = Router();

productAdminRouter.use(
  validateApiKey,
  authenticated,
  verified,
  hasRole("admin"),
);

productAdminRouter.get("/", getProducts);

module.exports = {
  productAdminRouter,
};
