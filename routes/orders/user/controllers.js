const { failedResponse, successResponse } = require("../../../common/helpers/httpResponse");
const { User } = require("../../../schemas/user");
const getOrders= async (req, res) => {

  try{
  const user= await User.findById(req.user._id).populate('orders')

    return successResponse({
      res,
      data: user.orders
    })

  } catch (err) {
    return failedResponse({
      res,
      err
    })
  }

}

module.exports = {
    getOrders
}