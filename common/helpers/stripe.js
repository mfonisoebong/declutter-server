const secretKey = process.env.STRIPE_TEST_SECRET_KEY;

const Stripe = require("stripe")(secretKey);

module.exports = {
  Stripe,
};
