const { Router } = require("express");
const {
  googleSignin,
  passportAuthenticate,
  localSignin,
} = require("./controllers");
const { zodValidator } = require("../../../common/middlewares/zodValidator");
const { SignInSchema } = require("./schema");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");

const signInRouter = Router();

signInRouter.get("/google", googleSignin, passportAuthenticate);
signInRouter.post(
  "/local",
  validateApiKey,
  zodValidator(SignInSchema),
  localSignin,
);

module.exports = {
  signInRouter,
};
