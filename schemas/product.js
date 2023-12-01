const mongoose = require("mongoose")

const VariantSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    }
})


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    sizes: {
        type: [String],
        required: true,
    },
    variants: {
        type: [VariantSchema],
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    vendor: {
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


ProductSchema.virtual('reviews', {
    ref: 'ProductReview',
    localField: '_id',
    foreignField: 'product'
})

const Product = mongoose.model("Product", ProductSchema)


module.exports = {
    Product
}