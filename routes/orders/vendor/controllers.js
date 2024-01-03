const { failedResponse, successResponse } = require("../../../common/helpers/httpResponse");
const { User } = require("../../../schemas/user");
const getVendorOrders= async (req, res) => {

  try{
    const user= await User.findById(req.user._id).populate('vendorOrders')

    return successResponse({
      res,
      data: user.vendorOrders
    })

  } catch (err) {
    return failedResponse({
      res,
      err
    })
  }

}

module.exports = {
  getVendorOrders
}