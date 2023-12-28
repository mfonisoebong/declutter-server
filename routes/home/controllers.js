const {
  failedResponse,
  successResponse,
} = require("../../common/helpers/httpResponse");
const { Category } = require("../../schemas/category");
const { Product } = require("../../schemas/product");
const getProducts = async (req, res) => {
  try {
    const categories = await Category.find().limit(10);
    const topSellingProducts = await Product.find()
      .select("name price sold variants vendor")
      .limit(5)
      .populate("vendor", "buisnessName")
      .sort({ sold: -1 });
    return successResponse({
      res,
      data: {
        categories,
        topSellingProducts,
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
  getProducts,
};
