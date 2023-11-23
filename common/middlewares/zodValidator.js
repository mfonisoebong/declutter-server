const { failedResponse } = require("../helpers/httpResponse");

const zodValidator = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);

      return next();
    } catch (err) {
      return failedResponse({
        status: 400,
        err,
        res,
      });
    }
  };
};

module.exports = {
  zodValidator,
};
