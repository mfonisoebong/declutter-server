const {Router} = require("express")
const {validateApiKey} = require("../../../common/middlewares/validateApiKey");
const {authenticated} = require("../../../common/middlewares/authenticated");
const {hasRole} = require("../../../common/middlewares/hasRole");
const {zodValidator} = require("../../../common/middlewares/zodValidator");
const {CreateProductSchema} = require("./schema");
const {createProduct} = require('./controller')
const {verified} = require("../../../common/middlewares/verified");

const productVendorRouter = Router()

productVendorRouter.use(validateApiKey, authenticated, verified, hasRole('vendor'))

productVendorRouter.post('/', zodValidator(CreateProductSchema), createProduct)

module.exports = {
    productVendorRouter
}