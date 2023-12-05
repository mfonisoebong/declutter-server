const passport = require("passport");
const { failedResponse } = require("../../../common/helpers/httpResponse");
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

    return res
      .cookie("jwt_token", token, { maxAge: 60000 * 60 * 24 })
      .json(user);
  })(req, res, next);
};

module.exports = {
  googleSignin,
  passportAuthenticate,
  localSignin,
};
