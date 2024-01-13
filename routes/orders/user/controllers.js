const {
  failedResponse,
  successResponse,
} = require("../../../common/helpers/httpResponse");
const { getPagination } = require("../../../common/utils/getPagination");
const { Order } = require("../../../schemas/order");

const getOrders = async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 20;
  try {
    const total = await Order.countDocuments({ user: req.user._id });
    const orders = await Order.find({
      user: req.user._id,
    })
      .select("invoice status deliveredAt")
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

const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("invoice");

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
  getOrders,
  getOrder,
};
