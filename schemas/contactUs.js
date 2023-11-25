const mongoose = require('mongoose')
const {PhoneSchema} = require("./phone");
const {EMAIL_REGEX} = require("../common/constants/regex");


const ContactUsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: PhoneSchema,
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => EMAIL_REGEX.test(email),
            message: "Invalid email address."
        }
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const ContactUs = mongoose.model('ContactUs', ContactUsSchema)

module.exports = {
    ContactUs
}