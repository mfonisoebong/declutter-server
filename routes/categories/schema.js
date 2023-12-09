const {z} = require("zod");
const CreateCategorySchema = z.object({
    name: z.string().min(1).max(255).required(),
    slug: z.string().min(1).max(255).required(),
})

module.exports = {
    CreateCategorySchema
}