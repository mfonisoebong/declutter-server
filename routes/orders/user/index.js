const {Router}= require('express')
const { validateApiKey } = require("../../../common/middlewares/validateApiKey");
const { authenticated } = require("../../../common/middlewares/authenticated");
const { verified } = require("../../../common/middlewares/verified");
const { hasRole } = require("../../../common/middlewares/hasRole");
const { getOrders } = require("./controllers");

const orderRouter = Router()

orderRouter.use(validateApiKey, authenticated, verified)


orderRouter.get('/', getOrders)



module.exports= {
    orderRouter
}