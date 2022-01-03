const { findOneAndUpdate } = require('../models/Invoice')
const Invoice = require('../models/Invoice')

class InvoiceController {

    // [POST] invoice/create
    async create(req, res) {

        const { products } = req.body

        //simple validation
        if (!products || products.length === 0) {
            return res.status(300).json({ success: false, message: "Products invalid" })
        }

        const newInvoice = new Invoice(req.body)

        try {
            await newInvoice.save()

            return res.status(200).json({ success: true, message: "Create new invoice success", newInvoice })

        } catch (err) {
            return res.status(400).json({ success: false, message: err.message })
        }
    }

    // [GET] invoice
    async getSome(req, res) {
        const { userId } = req.body

        try {
            const invoices = await Invoice.find({ userId })

            return res.status(200).json({ success: true, message: 'Get all invoice success', invoices })
        } catch (err) {
            return res.status(400).json({ success: false, message: err.message })
        }
    }

    // [GET] invoice/:id
    async getOne(req, res) {
        const { userId } = req.body
        const { id } = req.params

        try {

            const invoice = await Invoice.findOne({ userId, _id: id })

            return res.status(200).json({ success: true, message: 'Get a invoice success', invoice })

        } catch (err) {
            return res.status(200).json({ success: false, message: err.message })
        }
    }


    //for admin
    // [GET] invoice/admin
    async getAllForAdmin(req, res) {

        try {
            const invoices = await Invoice.find({}).sort({
                createdAt: 'asc',
            })

            return res.status(200).json({ success: true, message: "Get all invoice success", invoices })
        } catch (err) {
            return res.status(400).json({ success: false, message: err.message })
        }
    }

    // [GET] invoice/admin/:id
    async getOneByIdForAdmin(req, res) {
        const { id } = req.params

        try {
            const invoice = await Invoice.findOne({ _id: id })

            return res.status(200).json({ success: true, message: 'Get a invoice success', invoice })
        } catch (err) {
            return res.status(300).json({ success: false, message: err.message })
        }
    }

    // [PUT] invoice/admin/:id
    async updateOneForAdmin(req, res) {
        const { id } = req.params

        try {
            const newInvoice = await Invoice.findOneAndUpdate({ _id: id }, req.body, { new: true })

            return res.status(200).json({ success: true, message: 'Update invoice success', newInvoice })
        } catch (err) {
            return res.status(300).json({ success: false, message: err.message })
        }
    }

    // [DELETE] invoices/admin/:id
    async deleteOneForAdmin(req, res) {
        const id = req.params.id

        try {
            await Invoice.deleteOne({ _id: id })

            //all good
            return res.status(200).json({ success: true, message: 'Delete product successfully' })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }


}

module.exports = new InvoiceController()