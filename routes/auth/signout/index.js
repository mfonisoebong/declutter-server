const { signoutUser } = require("./controllers");
const { Router } = require("express");
const { authenticated } = require("../../../common/middlewares/authenticated");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");

const signoutRouter = Router();

signoutRouter.post("/", validateApiKey, authenticated, signoutUser);

module.exports = {
  signoutRouter,
};
