const { Product } = require("../../../schemas/product");
const { getPagination } = require("../../../common/utils/getPagination");
const {
  successResponse,
  failedResponse,
} = require("../../../common/helpers/httpResponse");
const getProducts = async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 20;

  try {
    const total = await Product.countDocuments({});
    const products = await Product.find({})
      .select("name price image")
      .skip((page - 1) * limit)
      .limit(limit);
    const pagination = getPagination(page, limit, total);

    const productsData = {
      ...pagination,
      data: products,
    };
    return successResponse({
      res,
      data: productsData,
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
