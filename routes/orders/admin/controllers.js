const { Order } = require("../../../schemas/order");
const { getPagination } = require("../../../common/utils/getPagination");
const {
  successResponse,
  failedResponse,
} = require("../../../common/helpers/httpResponse");
const getOrders = async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 20;
  try {
    const total = await Order.countDocuments({});
    const orders = await Order.find({})
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

module.exports = {
  getOrders,
};
