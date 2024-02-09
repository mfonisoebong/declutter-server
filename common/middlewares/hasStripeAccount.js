const { failedResponse } = require("../helpers/httpResponse");

function hasStripeAccount(req, res, next) {
  return next();
  if (!req.user.stripeAccountId) {
    return failedResponse({
      res,
      status: 403,
      err: "You need to connect a stripe account first.",
    });
  }
  return next();
}

module.exports = {
  hasStripeAccount,
};
