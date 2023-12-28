const { failedResponse } = require("../../common/helpers/httpResponse");
const createSubAccount = async (req, res) => {
  try {
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  createSubAccount,
  verifyPayment,
};
