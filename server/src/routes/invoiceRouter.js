const express = require('express')
const { verify } = require('jsonwebtoken')
const invoiceRouter = express.Router()
const invoiceController = require('../app/controllers/invoiceController')
const { verifyAdmin } = require('../utils/verify')

// admin
invoiceRouter.get('/admin', verifyAdmin, invoiceController.getAllForAdmin)
invoiceRouter.put('/admin/:id', verifyAdmin, invoiceController.updateOneForAdmin)
invoiceRouter.get('/admin/:id', verifyAdmin, invoiceController.getOneByIdForAdmin)
invoiceRouter.delete('/admin/:id', verifyAdmin, invoiceController.deleteOneForAdmin)

// customer
invoiceRouter.post('/create', invoiceController.create)
invoiceRouter.get('/:id', invoiceController.getOne)
invoiceRouter.get('/', invoiceController.getSome)



module.exports = invoiceRouter