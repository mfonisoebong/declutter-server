const {z} = require("zod");

const DeliveryAddressSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().min(1).email(),
    address: z.object({
        street: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
    }),
    phone: z.object({
        dialCode: z.string().min(1),
        number: z.string().min(1)
    })
})

module.exports = {
    DeliveryAddressSchema
}