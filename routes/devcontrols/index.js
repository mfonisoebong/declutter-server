const { Router } = require("express");
const { drop, migrate, seed } = require("./controllers");
const devControlsRouter = Router();

devControlsRouter.post("/migrate", migrate);
devControlsRouter.post("/seed", seed);
devControlsRouter.post("/drop", drop);

module.exports = {
  devControlsRouter,
};
