const Cart = require('../models/Cart')

class CartController {

    // [GET] cart
    async getCart(req, res) {
        const userId = req.body.userId

        try {
            let cart = await Cart.findOne({ userId }).populate({
                path: 'products.productId'
            })

            if (!cart) {
                // create new cart
                cart = new Cart({
                    userId,
                    products: [],
                })
                await cart.save()
            }

            return res.status(200).json({ success: true, message: 'Find cart successfully', cart })

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    // [POST] cart/:id
    async addProductToCart(req, res) {
        const productId = req.params.id
        const { userId, quantity } = req.body

        try {
            const cart = await Cart.findOne({ userId })
            if (!cart) return res.status(400).json({ success: false, message: 'Cart not found' })

            // check productId in cart

            const index = cart.products.findIndex((product) => {
                return product.productId.toString() === productId
            })

            if (index === -1) {
                cart.products.push({ productId, quantity })
            }
            else {
                cart.products[index].quantity += quantity;
            }

            let newCart = await cart.save()

            if (!newCart) return res.status(400).json({ success: false, message: 'Data add not valid' })
            return res.status(200).json({ success: true, message: 'Add product to cart successfully' })

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    // [POST] cart/:id/minus
    async minusProduct(req, res) {
        const productId = req.params.id
        const userId = req.body.userId
        let index = -1

        try {
            const cart = await Cart.findOne({ userId })

            if (!cart) return res.status(400).json({ success: false, message: 'Cart not found' })

            // check productId in cart
            cart.products.forEach((product, ind) => {
                if (product.productId.toString() === productId)
                    index = ind
            })

            if (index < 0) {
                return res.status(400).json({ success: false, message: 'Minus not success' })
            }

            //all good
            cart.products[index].quantity--
            // const newCart = await cart.save().populate({
            //     path: 'products.productId'
            // })

            await cart.save((err) => {
                if (err) return res.json(500, {
                    error: 'Cannot save'
                })

                cart.populate({
                    path: 'products.productId'
                }, (err, doc) => {
                    return res.status(200).json({ success: true, message: 'minus successfully', newCart: doc })
                })
            })

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    // [POST] cart/:id/plus
    async plusProudct(req, res) {
        const productId = req.params.id
        const userId = req.body.userId

        try {
            const cart = await Cart.findOne({ userId })

            if (!cart) return res.status(400).json({ success: false, message: 'Cart not found' })

            // check productId in cart
            const index = cart.findIndex(product => {
                return product.productId.toString() === productId
            })

            if (index === -1) {
                return res.status(400).json({ success: false, message: 'Plus not success' })
            }

            cart.products[index].quantity++

            await cart.save((err) => {
                if (err) return res.json(500, {
                    error: 'Cannot save'
                })


                cart.populate({
                    path: 'products.productId'
                }, (err, doc) => {
                    return res.status(200).json({ success: true, message: 'minus successfully' })
                })
            })

            return res.status(200).json({ success: false, message: 'minus not successfully' })

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    // [DELETE] cart/:id
    async removeProductFromCart(req, res) {
        const productId = req.params.id
        const userId = req.body.userId
        let index

        try {
            const newCart = await Cart.findOneAndUpdate({ userId }, {
                $pull: {
                    products: {
                        productId
                    }
                }
            }, { returnDocument: 'after' }).populate({
                path: 'products.productId',
            })
            return res.status(200).json({ success: true, message: 'Remove product from cart successfully', newCart })

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    // [DELETE] cart/reset
    async resetProductsInCart(req, res) {
        const { userId } = req.body
        console.log('come here')

        try {
            await Cart.findOneAndUpdate({ userId }, { products: [] })

            return res.status(200).json({ success: true, message: 'Reset cart success' })

        } catch (err) {
            return res.status(300).json({ success: false, message: err.message })
        }
    }
}

module.exports = new CartController()