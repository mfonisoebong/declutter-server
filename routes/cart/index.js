const express = require("express");
const { authenticated } = require("../../common/middlewares/authenticated");
const { validateApiKey } = require("../../common/middlewares/validateApiKey");
const { verified } = require("../../common/middlewares/verified");
const { zodValidator } = require("../../common/middlewares/zodValidator");
const { addToCart, decrement, increment } = require("./controllers");
const { AddToCartSchema } = require("./schema");

const cartRouter = express.Router();

cartRouter.use(validateApiKey, authenticated, verified);

cartRouter.post("/", zodValidator(AddToCartSchema), addToCart);
cartRouter.patch("/increment/:id", increment);
cartRouter.patch("/decrement/:id", decrement);

module.exports = {
  cartRouter,
};
