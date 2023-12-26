const {Router} = require('express')
const {createCategory, getCategories, deleteCategory} = require('./controllers')
const {validateApiKey} = require("../../common/middlewares/validateApiKey");
const {authenticated} = require("../../common/middlewares/authenticated");
const {verified} = require("../../common/middlewares/verified");
const {hasRole} = require("../../common/middlewares/hasRole");
const categoriesRouter = Router()

categoriesRouter.use(validateApiKey)

categoriesRouter.get('/', getCategories)
categoriesRouter.post('/', authenticated, verified, hasRole('admin'), createCategory)
categoriesRouter.delete('/:id', authenticated, verified, hasRole('admin'), deleteCategory)


module.exports = {
    categoriesRouter
}

