const mongoose = require('mongoose')

const VerificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expiresAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
        index: {expires: '30m'}
    }
})


const Verification = mongoose.model('Verification', VerificationSchema)


module.exports = {Verification}