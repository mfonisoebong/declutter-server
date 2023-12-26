const {Router} = require("express")
const {validateApiKey} = require("../../common/middlewares/validateApiKey");
const {authenticated} = require("../../common/middlewares/authenticated");
const {verified} = require("../../common/middlewares/verified");
const {hasRole} = require("../../common/middlewares/hasRole");
const {createSubAccount} = require('./controllers')
const {zodValidator} = require("../../common/middlewares/zodValidator");
const {PaymentSchema} = require('./schema')
const paymentsRouter = Router()

paymentsRouter.use(validateApiKey, authenticated, verified, hasRole('vendor'))

paymentsRouter.post('/account/create', zodValidator(PaymentSchema), createSubAccount)
module.exports = {
    paymentsRouter
}