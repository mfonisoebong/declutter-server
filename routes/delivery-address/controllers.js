const {DeliveryAddress} = require("../../schemas/deliveryAddress");
const {successResponse, failedResponse} = require("../../common/helpers/httpResponse");
const addOrUpdateDeliveryAddress = async (req, res) => {
    try {
        const deliveryAddress = await DeliveryAddress.createOrUpdate(req.user._id, req.body)
        return successResponse({res, message: "Delivery address added successfully.", data: deliveryAddress})

    } catch (err) {
        return failedResponse({res, err: err})
    }

}

const getDeliveryAddress = async (req, res) => {
    try {
        const deliveryAddress = await DeliveryAddress.findOne({user: req.user._id})

        return successResponse({res, data: deliveryAddress})

    } catch (err) {
        return failedResponse({res, err: err, data: null})
    }
}

module.exports = {
    addOrUpdateDeliveryAddress,
    getDeliveryAddress
}