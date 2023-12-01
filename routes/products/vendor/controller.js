const {failedResponse, successResponse} = require("../../../common/helpers/httpResponse");
const {Product} = require("../../../schemas/product");
const createProduct = async (req, res) => {

    try {
        const product = new Product({...req.body, vendor: req.user._id})
        await product.save()
        return successResponse({
            res,
            status: 201,
            data: product,
            message: 'Product created successfully'
        })

    } catch (err) {
        return failedResponse({
            res, err
        })
    }
}

module.exports = {
    createProduct
}