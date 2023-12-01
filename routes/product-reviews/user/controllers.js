const {ProductReview} = require("../../../schemas/productReview");
const {successResponse, failedResponse} = require("../../../common/helpers/httpResponse");
const createProductReview = async (req, res) => {
    try {
        const review = new ProductReview({
            ...req.body,
            user: req.user._id,
        })
        await review.save()

        return successResponse({
            res,
            status: 201,
            data: review,
            message: 'Review created successfully'
        })

    } catch (err) {
        return failedResponse({
            err,
            res
        })
    }
}


module.exports = {
    createProductReview
}