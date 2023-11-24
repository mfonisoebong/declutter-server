const { Router } = require("express");
const { getUser } = require("./controllers");
const { authenticated } = require("../../../common/middlewares/authenticated");

const userRouter = Router();

userRouter.get("/", authenticated, getUser);

module.exports = {
  userRouter,
};
