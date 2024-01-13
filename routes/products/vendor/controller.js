const {
  failedResponse,
  successResponse,
} = require("../../../common/helpers/httpResponse");
const { getPagination } = require("../../../common/utils/getPagination");
const { Product } = require("../../../schemas/product");
const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, vendor: req.user._id });
    await product.save();
    return successResponse({
      res,
      status: 201,
      data: product,
      message: "Product created successfully",
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const getProducts = async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 20;

  try {
    const total = await Product.countDocuments({ vendor: req.user._id });
    const products = await Product.find({
      vendor: req.user._id,
    })
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
  createProduct,
  getProducts,
};
