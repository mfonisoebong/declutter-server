const {z} = require("zod");

const VariantSchema = z.object({
    color: z.string().min(1).max(100),
    image: z.string().min(1).max(100),
    quantity: z.number().min(0),
})

const CreateProductSchema = z.object({
    name: z.string().min(1).max(255),
    price: z.number().min(0),
    sizes: z.array(z.string().min(1).max(100)),
    variants: z.array(VariantSchema),
    categories: z.array(z.string().min(1).max(100)),
})


module.exports = {
    CreateProductSchema,
    VariantSchema
}