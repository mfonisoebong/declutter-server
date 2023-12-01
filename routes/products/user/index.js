const express = require("express")
const {getProduct} = require("./controllers");
const {validateApiKey} = require("../../../common/middlewares/validateApiKey");

const productUserRouter = express.Router()

productUserRouter.use(validateApiKey)

productUserRouter.get('/:id', getProduct)

module.exports = {
    productUserRouter
}