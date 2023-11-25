const mongoose = require('mongoose')

const PhoneSchema = new mongoose.Schema({
    dialCode: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
})

module.exports = {
    PhoneSchema
}