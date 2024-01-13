const {
  failedResponse,
  successResponse,
} = require("../../../common/helpers/httpResponse");
const { Stripe } = require("../../../common/helpers/stripe");
const { Order } = require("../../../schemas/order");
const { Product } = require("../../../schemas/product");
const { MONTHS } = require("../../../common/constants/months");

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
    const months = orders.map((order) => order.createdAt.getMonth());
    const monthsCount = {};
    months.forEach((month) => {
      monthsCount[month] = (monthsCount[month] || 0) + 1;
    });
    const monthsSales = {};
    months.forEach((month, index) => {
      monthsSales[month] = (monthsSales[month] || 0) + amounts[index];
    });
    const monthsData = [];
    for (let i = 0; i < 12; i++) {
      monthsData.push({
        month: MONTHS[i],
        count: monthsCount[i] || 0,
        sales: monthsSales[i] || 0,
      });
    }
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
    const cartItems = orders.flatMap((order) => order.invoice.cartItems);
    const amounts = cartItems.map((item) => item.product.price * item.quantity);
    const products = cartItems.map((item) => item.product);
    const productsCount = {};
    products.forEach((product) => {
      productsCount[product] = (productsCount[product] || 0) + 1;
    });
    const productsSales = {};
    products.forEach((product, index) => {
      productsSales[product] = (productsSales[product] || 0) + amounts[index];
    });
    const productsData = [];
    for (let i = 0; i < products.length; i++) {
      productsData.push({
        product: products[i],
        sales: productsSales[i] || 0,
      });
    }

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
