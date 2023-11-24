const { failedResponse } = require("../helpers/httpResponse");

// This middleware is to be used after authenticated middleware
const verified = (req, res, next) => {
  if (!req?.user?.verifiedAt) {
    return failedResponse({
      res,
      err: "User not verified",
      status: 403,
    });
  }
  return next();
};

module.exports = {
  verified,
};
