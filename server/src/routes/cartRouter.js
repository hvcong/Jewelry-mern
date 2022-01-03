const express = require('express')
const cartRouter = express.Router()

const cartController = require('../app/controllers/cartController')

cartRouter.get('/', cartController.getCart)
cartRouter.delete('/reset', cartController.resetProductsInCart)
cartRouter.post('/:id/minus', cartController.minusProduct)
cartRouter.post('/:id', cartController.addProductToCart)
cartRouter.delete('/:id', cartController.removeProductFromCart)


module.exports = cartRouter