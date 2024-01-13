const {
  failedResponse,
  successResponse,
} = require("../../../common/helpers/httpResponse");
const { User } = require("../../../schemas/user");
const { Order } = require("../../../schemas/order");
const getOrders = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("orders");

    return successResponse({
      res,
      data: user.orders,
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
