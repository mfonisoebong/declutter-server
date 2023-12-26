const {Router} = require('express')
const {zodValidator} = require("../../common/middlewares/zodValidator");
const {ContactUsSchema} = require("./schema");
const {validateApiKey} = require("../../common/middlewares/validateApiKey");
const {createContactUs} = require("./controller");
const contactUsRouter = Router()

contactUsRouter.use(validateApiKey)
contactUsRouter.post('/', zodValidator(ContactUsSchema), createContactUs)

module.exports = {
    contactUsRouter
}