const passport = require("passport");
const { User } = require("../../../schemas/user");
const { failedResponse } = require("../../../common/helpers/httpResponse");
const { serializeUser } = require("../../../common/helpers/serializeUser");

const googleSignup = (req, res, next) => {
  req.session.authPage = "signup";
  req.session.role = req.query.role;
  next();
};

const passportAuthenticate = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const userLocalSignup = async (req, res, next) => {
  try {
    const { password, confirmPassword, ...restData } = req.body;

    const user = new User({
      ...restData,
      hash: password,
    });
    await user.save();

    const token = serializeUser(user);
    user.hash = undefined;
    return res
      .cookie("jwt_token", token, {
        maxAge: 60000 * 60 * 24,
      })
      .json(user);
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const vendorLocalSignup = async (req, res) => {
  try {
    const { password, confirmPassword, ...restData } = req.body;

    const user = new User({
      ...restData,
      hash: password,

      role: "vendor",
    });
    await user.save();

    const token = serializeUser(user);
    user.hash = undefined;
    return res
      .cookie("jwt_token", token, {
        maxAge: 60000 * 60 * 24,
      })
      .json(user);
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

module.exports = {
  googleSignup,
  passportAuthenticate,
  userLocalSignup,
  vendorLocalSignup,
};
