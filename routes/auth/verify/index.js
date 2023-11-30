const {Router} = require('express')

const verifyRoute = Router()
const {resendVerificationCode, verifyUser} = require('./controllers')
const {validateApiKey} = require("../../../common/middlewares/validateApiKey");
const {authenticated} = require("../../../common/middlewares/authenticated");


verifyRoute.post('/resend', validateApiKey, authenticated, resendVerificationCode)
verifyRoute.get('/:id', verifyUser)


module.exports = {
    verifyRoute
}