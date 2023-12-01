const {z} = require("zod");


const CreateProductReview = z.object({
    rating: z.number().min(0).max(5),
    comment: z.string(),
    product: z.string().min(1),
})

module.exports = {
    CreateProductReview
}