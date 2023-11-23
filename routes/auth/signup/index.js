const { Router } = require("express");
const {
  googleSignup,
  passportAuthenticate,
  userLocalSignup,
} = require("./controllers");
const { zodValidator } = require("../../../common/middlewares/zodValidator");
const { SignUpSchema } = require("./schema");

const signUpRouter = Router();

signUpRouter.get("/google", googleSignup, passportAuthenticate);
signUpRouter.post("/local/user", zodValidator(SignUpSchema), userLocalSignup);

module.exports = {
  signUpRouter,
};
