const Axios = require("axios");

const secretKey =
  process.env.NODE_ENV === "production"
    ? process.env.PAYSTACK_LIVE_SECRET_KEY
    : process.env.PAYSTACK_TEST_SECRET_KEY;

const PaystackAxios = Axios.create({
  baseURL: process.env.PAYSTACK_URL,
  headers: {
    Authorization: `Bearer ${secretKey}`,
  },
});

module.exports = {
  PaystackAxios,
};
