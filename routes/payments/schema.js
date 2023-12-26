const {z} = require('zod')


const PaymentSchema = z.object({
    bankCode: z.string().min(1),
    accountNumber: z.string().min(1),
})


module.exports = {
    PaymentSchema
}