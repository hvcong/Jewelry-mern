const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    sale: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        enum: ['watch', 'ring', 'earring', 'necklace'],
        default: 'watch'
    },
    imageUrl: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    description: {
        type: String
    },
    material: {
        type: String,
        enum: ['diamond', 'gold', 'silver', 'synthetic'],
        default: 'synthetic'
    },
    sold: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

//plugins

module.exports = mongoose.model('products', ProductSchema)