const { Router } = require("express");
const { validateApiKey } = require("../../common/middlewares/validateApiKey");
const { getProducts } = require("./controllers");
const homeRouter = Router();

homeRouter.use(validateApiKey);

homeRouter.get("/", getProducts);

module.exports = {
  homeRouter,
};
