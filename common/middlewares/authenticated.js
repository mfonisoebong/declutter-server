const { deserializeUser } = require("../helpers/deserializeUser");
const { failedResponse } = require("../helpers/httpResponse");
const authenticated = async (req, res, next) => {
  try {
    const user = await deserializeUser(req);
    if (user) {
      user.hash = undefined;
      req.user = user;
      return next();
    }
    return failedResponse({
      res,
      status: 401,
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
      status: 500,
    });
  }
};

module.exports = {
  authenticated,
};
