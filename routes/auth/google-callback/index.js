const { Router } = require("express");

const { googleCallback } = require("./controllers");

const googleCallbackRouter = Router();

googleCallbackRouter.get("/", googleCallback);

module.exports = {
  googleCallbackRouter,
};
