const express = require('express')
const {validateApiKey} = require("../../../common/middlewares/validateApiKey");
const {authenticated} = require("../../../common/middlewares/authenticated");
const {zodValidator} = require("../../../common/middlewares/zodValidator");
const {CreateProductReview} = require("./schema");
const {createProductReview} = require("./controllers");
const {verified} = require("../../../common/middlewares/verified");

const reviewUserRouter = express.Router()

reviewUserRouter.use(validateApiKey, authenticated, verified)

reviewUserRouter.post("/", zodValidator(CreateProductReview), createProductReview)

module.exports = {
    reviewUserRouter
}




