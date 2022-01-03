const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CartSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'users',
    },
    products: [
        {
            productId: {
                type: mongoose.ObjectId,
                ref: 'products',
            },
            quantity: {
                type: Number,
                min: 1,
                default: 1
            },
        }
    ]
})

//plugins

module.exports = mongoose.model('carts', CartSchema)