const mongoose = require('mongoose');
const {EMAIL_REGEX} = require('../common/constants/regex')
const argon = require('argon2')

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

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'vendor']
    },
    authStrategy: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => EMAIL_REGEX.test(email),
            message: "Invalid email address."
        }
    },
    hash: {
        type: String,
        default: null
    },
    phone: {
        type: PhoneSchema,
        default: null
    }
}, {
    timestamps: true
})

UserSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})

UserSchema.method({
    verifyHash: async function (hash, password) {
        try {
            return argon.verify(hash, password)
        } catch (err) {
            throw new Error(err)
        }
    }
})

UserSchema.post('validate', async function (doc, next) {
    try {
        const hash = await argon.hash(doc.hash)
        doc.hash = hash
        next()
    } catch (err) {
        next(err)
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = {User}
