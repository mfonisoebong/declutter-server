const { Router } = require("express");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");
const { authenticated } = require("../../../common/middlewares/authenticated");
const { hasRole } = require("../../../common/middlewares/hasRole");
const { zodValidator } = require("../../../common/middlewares/zodValidator");
const { CreateProductSchema } = require("./schema");
const { createProduct, getProducts } = require("./controller");
const { verified } = require("../../../common/middlewares/verified");
const {
  hasStripeAccount,
} = require("../../../common/middlewares/hasStripeAccount");

const productVendorRouter = Router();

productVendorRouter.use(
  validateApiKey,
  authenticated,
  verified,
  hasRole("vendor"),
  hasStripeAccount,
);

productVendorRouter.post("/", zodValidator(CreateProductSchema), createProduct);
productVendorRouter.get("/", getProducts);

module.exports = {
  productVendorRouter,
};
