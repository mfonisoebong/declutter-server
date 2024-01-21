const {
  failedResponse,
  successResponse,
} = require("../../../common/helpers/httpResponse");
const { Stripe } = require("../../../common/helpers/stripe");
const { Order } = require("../../../schemas/order");
const { Product } = require("../../../schemas/product");
const { MONTHS } = require("../../../common/constants/months");
const { User } = require("../../../schemas/user");
const { salesAnalysis } = require("../utils/salesAnalysis");
const { topSales } = require("../utils/topSales");
const getOverview = async (req, res) => {
  try {
    const orders = await Order.find({
      status: "delivered",
    }).populate("invoice");

    const cartItems = orders.flatMap((order) => order.invoice.cartItems);

    const amounts = cartItems.map((item) => item.product.price * item.quantity);

    const totalSales = amounts.reduce((acc, curr) => acc + curr, 0);

    const pendingOrdersCount = await Order.countDocuments({
      status: "pending",
    });
    const usersCount = await User.countDocuments({});
    const earnings = totalSales * 0.1;

    return successResponse({
      res,
      data: {
        totalSales,
        pendingOrdersCount,
        usersCount,
        earnings,
      },
    });
  } catch (err) {}
};

const getSalesAnalysis = async (req, res) => {
  try {
    const orders = await Order.find({
      status: "delivered",
    }).populate("invoice");
    const monthsData = salesAnalysis(orders);
    return successResponse({
      res,
      data: {
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
    });
    const cancelled = await Order.countDocuments({
      status: "cancelled",
    });
    const delivered = await Order.countDocuments({
      status: "delivered",
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
    const orders = await Order.find({})
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

module.exports = {
  getOverview,
  getSalesAnalysis,
  getOrdersStatus,
  getTopSales,
  recentOrders,
};
