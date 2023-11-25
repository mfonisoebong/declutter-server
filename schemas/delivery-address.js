const mongoose = require('mongoose')
const {EMAIL_REGEX} = require("../common/constants/regex");
const {PhoneSchema} = require("./phone");

const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },

})

const DeliveryAddressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => EMAIL_REGEX.test(email),
            message: "Invalid email address."
        }
    },
    address: AddressSchema,
    phone: PhoneSchema,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const DeliveryAddress = mongoose.model('DeliveryAddress', DeliveryAddressSchema)

module.exports = {
    DeliveryAddress
}