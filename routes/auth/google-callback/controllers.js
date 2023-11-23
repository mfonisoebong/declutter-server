const passport = require("passport");
const { serializeUser } = require("../../../common/helpers/serializeUser");
const { failedResponse } = require("../../../common/helpers/httpResponse");

const googleCallback = async (req, res) => {
  passport.authenticate("google", async (err, user, info) => {
    if (err) {
      return failedResponse({
        err,
        status: 421,
        res,
      });
    }

    const token = serializeUser(user);
    return res
      .status(200)
      .cookie("jwt_token", token, {
        expiresIn: 60000 * 60 * 24,
      })
      .redirect("/");
  })(req, res);
};

module.exports = {
  googleCallback,
};
