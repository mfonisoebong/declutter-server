const {Router} = require('express')
const {addOrUpdateDeliveryAddress, getDeliveryAddress} = require("./controllers");
const {validateApiKey} = require("../../common/middlewares/validateApiKey");
const {authenticated} = require("../../common/middlewares/authenticated");
const {verified} = require("../../common/middlewares/verified");
const {zodValidator} = require("../../common/middlewares/zodValidator");
const {DeliveryAddressSchema} = require("./schema");
const deliveryAddressRouter = Router()

deliveryAddressRouter.use(validateApiKey, authenticated, verified)

deliveryAddressRouter.post('/', zodValidator(DeliveryAddressSchema), addOrUpdateDeliveryAddress)
deliveryAddressRouter.get('/', getDeliveryAddress)


module.exports = {deliveryAddressRouter}