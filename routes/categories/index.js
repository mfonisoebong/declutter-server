const {Router} = require('express')
const {createCategory, getCategories, deleteCategory} = require('./controllers')
const {validateApiKey} = require("../../common/middlewares/validateApiKey");
const {authenticated} = require("../../common/middlewares/authenticated");
const {verified} = require("../../common/middlewares/verified");
const {hasRole} = require("../../common/middlewares/hasRole");
const categoriesRouter = Router()

categoriesRouter.get('/', validateApiKey, getCategories)
categoriesRouter.post('/', validateApiKey, authenticated, verified, hasRole('admin'), createCategory)
categoriesRouter.delete('/:id', validateApiKey, authenticated, verified, hasRole('admin'), deleteCategory)


module.exports = {
    categoriesRouter
}

