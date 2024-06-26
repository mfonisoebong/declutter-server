const {
  failedResponse,
  successResponse,
} = require("../../../common/helpers/httpResponse");
const { Stripe } = require("../../../common/helpers/stripe");
const { Order } = require("../../../schemas/order");
const { Product } = require("../../../schemas/product");
const { MONTHS } = require("../../../common/constants/months");
const { salesAnalysis } = require("../utils/salesAnalysis");
const { topSales } = require("../utils/topSales");

const getOverview = async (req, res) => {
  try {
    const balance = await Stripe.balance.retrieve({
      stripeAccount: req.user.stripeAccountId,
    });
    const balanceAvailable = balance.available[0].amount;
    const vendorOrders = await Order.find({
      vendor: req.user._id,
      status: "delivered",
    }).populate("invoice");

    const cartItems = vendorOrders.flatMap((order) => order.invoice.cartItems);

    const amounts = cartItems.map((item) => item.product.price * item.quantity);

    const totalSales = amounts.reduce((acc, curr) => acc + curr, 0);

    const products = await Product.find({ vendor: req.user._id });

    return successResponse({
      res,
      data: {
        balanceAvailable,
        totalSales,
        itemsSold: cartItems.length,
        totalProducts: products.length,
      },
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const getSalesAnalysis = async (req, res) => {
  try {
    const orders = await Order.find({
      vendor: req.user._id,
      status: "delivered",
    }).populate("invoice");
    const cartItems = orders.flatMap((order) => order.invoice.cartItems);
    const amounts = cartItems.map((item) => item.product.price * item.quantity);
    const totalSales = amounts.reduce((acc, curr) => acc + curr, 0);
    const monthsData = salesAnalysis(orders);
    return successResponse({
      res,
      data: {
        totalSales,
        monthsData,
      },
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const getOrdersStatus = async (req, res) => {
  try {
    const pending = await Order.countDocuments({
      status: "pending",
      vendor: req.user._id,
    });
    const cancelled = await Order.countDocuments({
      status: "cancelled",
      vendor: req.user._id,
    });
    const delivered = await Order.countDocuments({
      status: "delivered",
      vendor: req.user._id,
    });

    return successResponse({
      res,
      data: {
        pending,
        cancelled,
        delivered,
      },
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const getTopSales = async (req, res) => {
  try {
    const orders = await Order.find({
      vendor: req.user._id,
      status: "delivered",
    }).populate("invoice");
    const productsData = topSales(orders);
    return successResponse({
      res,
      data: {
        productsData,
      },
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const recentOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      vendor: req.user._id,
    })
      .sort({
        createdAt: "desc",
      })
      .populate("invoice")
      .limit(15);

    return successResponse({
      res,
      data: orders,
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const getBalance = async (req, res) => {
  try {
    //   Get payouts from stripe
    const fiveDaysAgo = Math.floor(Date.now() / 1000) - 5 * 24 * 60 * 60;
    const charges = await Stripe.charges.list({
      limit: 10,
      created: {
        gte: fiveDaysAgo,
      },
      stripeAccount: req.user.stripeAccount,
    });
    const balance = await Stripe.balance.retrieve({
      stripeAccount: req.user.stripeAccountId,
    });
    const balanceAvailable = balance.available[0].amount;
    return successResponse({
      res,
      data: {
        recentTransactions: charges.data,
        balanceAvailable,
      },
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

module.exports = {
  getOverview,
  getSalesAnalysis,
  getTopSales,
  recentOrders,
  getBalance,
  getOrdersStatus,
};
