const { Router } = require("express");
const {
  googleSignup,
  passportAuthenticate,
  userLocalSignup,
} = require("./controllers");
const { zodValidator } = require("../../../common/middlewares/zodValidator");
const { SignUpSchema } = require("./schema");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");

const signUpRouter = Router();

signUpRouter.get("/google", googleSignup, passportAuthenticate);
signUpRouter.post(
  "/local/user",
  validateApiKey,
  zodValidator(SignUpSchema),
  userLocalSignup,
);

module.exports = {
  signUpRouter,
};
