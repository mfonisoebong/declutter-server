const {failedResponse, successResponse} = require("../../common/helpers/httpResponse");
const {Category} = require("../../schemas/category");
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        return successResponse({res, data: categories})
    } catch (err) {
        return failedResponse({res, err})
    }
}

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return successResponse({res, data: category})
    } catch (err) {
        return failedResponse({res, err})
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        return successResponse({res, data: category})
    } catch (err) {
        return failedResponse({res, err})
    }
}

module.exports = {
    getCategories,
    createCategory,
    deleteCategory
}