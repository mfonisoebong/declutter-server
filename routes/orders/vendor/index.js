const {Router}= require('express')
const { validateApiKey } = require("../../../common/middlewares/validateApiKey");
const { authenticated } = require("../../../common/middlewares/authenticated");
const { verified } = require("../../../common/middlewares/verified");
const { hasRole } = require("../../../common/middlewares/hasRole");
const { getVendorOrders } = require("./controllers");


const vendorOrderRouter = Router()

vendorOrderRouter.use(validateApiKey, authenticated, verified, hasRole('vendor'))

vendorOrderRouter.get('/', getVendorOrders)

module.exports = {
    vendorOrderRouter
}