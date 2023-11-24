const { failedResponse } = require("../helpers/httpResponse");
const hasRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== role) {
      return failedResponse({
        res,
        err: "You are not allowed to access this route",
        status: 403,
      });
    }

    return next();
  };
};

module.exports = {
  hasRole,
};
