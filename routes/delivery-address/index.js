const {Router} = require('express')
const {addOrUpdateDeliveryAddress, getDeliveryAddress} = require("./controllers");
const {validateApiKey} = require("../../common/middlewares/validateApiKey");
const {authenticated} = require("../../common/middlewares/authenticated");
const {verified} = require("../../common/middlewares/verified");
const {zodValidator} = require("../../common/middlewares/zodValidator");
const {DeliveryAddressSchema} = require("./schema");
const deliveryAddressRouter = Router()

deliveryAddressRouter.post('/', validateApiKey, authenticated, verified, zodValidator(DeliveryAddressSchema), addOrUpdateDeliveryAddress)
deliveryAddressRouter.get('/', validateApiKey, authenticated, verified, getDeliveryAddress)


module.exports = {deliveryAddressRouter}