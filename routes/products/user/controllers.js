const {failedResponse, successResponse} = require("../../../common/helpers/httpResponse");
const {Product} = require('../../../schemas/product')
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate({path: 'reviews', perDocumentLimit: 4, select: 'rating comment'})
            .populate({path: 'vendor', select: 'buisnessName phone'})
            .exec();

        if (!product) {
            return failedResponse({
                res,
                err: 'Product not found'
            })
        }

        return successResponse({
            res,
            data: product
        })

    } catch (err) {
        return failedResponse({
            res,
            err
        })
    }
}


module.exports = {
    getProduct
}