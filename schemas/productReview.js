const mongoose = require("mongoose")

const ProductReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})


const ProductReview = mongoose.model("ProductReview", ProductReviewSchema)

module.exports = {
    ProductReview
}