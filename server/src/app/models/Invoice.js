const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'users',
    },
    products: [
        {
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
            imageUrl: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                min: 1,
                default: 1
            }
        }
    ],
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    more: {
        type: String,
    },
    payBy: {
        type: String,
        enum: ['byCash', 'byBank'],
        default: 'byCash',
    },
    status: {
        type: String,
        enum: ['processing', 'shipping', 'shipped', 'success', 'faild'],
        default: 'processing',
    },
    transportFee: {
        type: Number,
        min: 0,
        default: 0,
    },
    voucherPercent: {
        type: Number,
        min: 0,
        default: 0,
    },
}, { timestamps: true })

//plugins

module.exports = mongoose.model('invoices', InvoiceSchema)