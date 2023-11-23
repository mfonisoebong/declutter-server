const { Router } = require("express");
const {
  googleSignin,
  passportAuthenticate,
  localSignin,
} = require("./controllers");
const { zodValidator } = require("../../../common/middlewares/zodValidator");
const { SignInSchema } = require("./schema");

const signInRouter = Router();

signInRouter.get("/google", googleSignin, passportAuthenticate);
signInRouter.post("/local", zodValidator(SignInSchema), localSignin);

module.exports = {
  signInRouter,
};
