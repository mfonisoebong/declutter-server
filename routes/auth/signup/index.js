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
const multer = require("multer");
const bodyParser = require("body-parser");

const signUpRouter = Router();

const avatarUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/png"
    ) {
      return cb(new Error("Only jpeg and png files are allowed"));
    }
    cb(null, true);
  },
  limits: {
    // 5MB
    fileSize: 1024 * 1024 * 5,
  },
}).single("avatar");

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
  avatarUpload,
  zodValidator(VendorSignUpSchema),
  vendorLocalSignup
);

module.exports = {
  signUpRouter,
};
