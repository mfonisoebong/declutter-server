const {z} = require("zod");

const ContactUsSchema = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    email: z.string().email(),
    message: z.string().min(10).max(500),
    phone: z.object({
        dialCode: z.string().min("1", "Phone number is required"),
        number: z.string().min("1", "Phone dial code is required")
    })
})


module.exports = {
    ContactUsSchema
}