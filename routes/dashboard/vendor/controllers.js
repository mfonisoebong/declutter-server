const { failedResponse } = require("../../../common/helpers/httpResponse");
const { Stripe } = require("../../../common/helpers/stripe");
const getOverview = async (req, res) => {
  try {
    //   const vendor account balance
    // const balance= await Stripe.accounts()
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

module.exports = {
  getOverview,
};
