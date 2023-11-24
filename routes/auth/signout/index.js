const { signoutUser } = require("./controllers");
const { Router } = require("express");
const { authenticated } = require("../../../common/middlewares/authenticated");

const signoutRouter = Router();

signoutRouter.post("/", authenticated, signoutUser);

module.exports = {
  signoutRouter,
};
