const { Router } = require("express");
const {
  googleSignup,
  passportAuthenticate,
  userLocalSignup,
  vendorLocalSignup,
} = require("./controllers");
const { zodValidator } = require("../../../common/middlewares/zodValidator");
const { SignUpSchema, VendorSignUpSchema } = require("./schema");
const {
  validateApiKey,
} = require("../../../common/middlewares/validateApiKey");
const { guest } = require("../../../common/middlewares/guest");

const signUpRouter = Router();

signUpRouter.get("/google", googleSignup, passportAuthenticate);
signUpRouter.post(
  "/local/user",
  validateApiKey,
  guest,
  zodValidator(SignUpSchema),
  userLocalSignup
);

signUpRouter.post(
  "/local/vendor",
  validateApiKey,
  guest,
  zodValidator(VendorSignUpSchema),
  vendorLocalSignup
);

module.exports = {
  signUpRouter,
};
