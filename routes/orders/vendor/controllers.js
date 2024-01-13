const {
  failedResponse,
  successResponse,
} = require("../../../common/helpers/httpResponse");
const { User } = require("../../../schemas/user");
const { Order } = require("../../../schemas/order");
const { getPagination } = require("../../../common/utils/getPagination");

const validateOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      vendor: req.user._id,
    });
    req.order = order;
    if (!order) {
      return failedResponse({
        res,
        err: "Order not found",
        status: 404,
      });
    }

    return next();
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};
const getVendorOrders = async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 20;
  try {
    const total = await Order.countDocuments({ vendor: req.user._id });
    const orders = await Order.find({
      vendor: req.user._id,
    })
      .populate({
        path: "user",
        select: "firstName lastName email buisnessName",
      })

      .skip((page - 1) * limit)
      .limit(limit);
    const pagination = getPagination(page, limit, total);

    const ordersData = {
      ...pagination,
      data: orders,
    };
    return successResponse({
      res,
      data: ordersData,
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};
const confirmDelivery = async (req, res) => {
  try {
    if (req.order.status === "delivered") {
      return failedResponse({
        res,
        message: "Order already delivered",
        err: "Order already delivered",
        status: 403,
      });
    }

    req.order.status = "delivered";
    req.order.deliveredAt = Date.now();
    await req.order.save();
    return successResponse({
      res,
      message: "Order marked as delivered",
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    if (req.order.status === "cancelled") {
      return failedResponse({
        res,
        message: "Order already cancelled",
        err: "Order already cancelled",
        status: 403,
      });
    }

    req.order.status = "cancelled";
    await req.order.save();
    return successResponse({
      res,
      message: "Order cancelled",
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "user",
        select: "firstName lastName email phone address buisnessName",
      })
      .populate("invoice");
    return successResponse({
      res,
      data: order,
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

module.exports = {
  getVendorOrders,
  confirmDelivery,
  cancelOrder,
  validateOrder,
  getOrder,
};
