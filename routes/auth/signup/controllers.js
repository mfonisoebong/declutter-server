const passport = require("passport");
const argon = require("argon2");
const { User } = require("../../../models");
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
    const { password, ...restData } = req.body;
    const hash = await argon.hash(password);

    const user = await User.create({
      ...restData,
      hash,
    });

    const token = serializeUser(user);
    return res
      .cookie("jwt_token", token, {
        maxAge: 60000 * 60 * 24,
      })
      .json(user);
  } catch (err) {
    console.log(err);
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
};
