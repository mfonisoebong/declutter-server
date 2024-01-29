const passport = require("passport");
const {
  failedResponse,
  successResponse,
} = require("../../../common/helpers/httpResponse");
const { serializeUser } = require("../../../common/helpers/serializeUser");

const googleSignin = (req, res, next) => {
  req.session.authPage = "signin";
  next();
};

const passportAuthenticate = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const localSignin = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return failedResponse({ res, message: "error", err, status: 401 });
    }

    const token = serializeUser(user);

    return successResponse({
      res,
      message: "success",
      data: { user, token },
    });
  })(req, res, next);
};

module.exports = {
  googleSignin,
  passportAuthenticate,
  localSignin,
};
