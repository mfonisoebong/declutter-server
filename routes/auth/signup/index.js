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
const path = require("path");

const signUpRouter = Router();

const avatarUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../../uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
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
  avatarUpload,
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
