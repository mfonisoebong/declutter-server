const { errorParser } = require("../utils/errorParser");

const successResponse = ({ res, message = null, status = 200 }) => {
  return res.status(status).json({
    message,
    status: "okay",
  });
};

const failedResponse = ({ res, message = null, status = 500, err }) => {
  return res.status(status).json({
    message,
    error: errorParser(err),
    status: "failed",
  });
};

module.exports = {
  successResponse,
  failedResponse,
};
