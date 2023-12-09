const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    status: {
        type: String,
        enum: ['pending', 'delivered'],
        default: 'pending'
    },
    deliveredAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

OrderSchema.virtual('invoice', {
    foreignField: '_id',
    localField: 'invoice',
    ref: 'Invoice',
})


const Order = mongoose.model('Order', OrderSchema)

module.exports = {
    Order
}