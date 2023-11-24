const { Router } = require("express");
const { getUser } = require("./controllers");
const { authenticated } = require("../../../common/middlewares/authenticated");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");

const userRouter = Router();

userRouter.get("/", validateApiKey, authenticated, getUser);

module.exports = {
  userRouter,
};
