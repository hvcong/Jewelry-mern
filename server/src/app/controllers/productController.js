const Product = require('../models/Product')

class ProductController {

    // [GET] /admin/products/:id
    async getProduct(req, res) {
        const { id } = req.params

        try {
            const product = await Product.findOne({ _id: id })
            return res.status(200).json({ success: true, product })
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async getSomeProduct(req, res) {
        const query = req.query

        // get all query 
        let page = query._page && Number(query._page) || 1
        let limit = query._limit && Number(query._limit) || 12
        let sort = query._sort
        let order = query._order // asc, desc
        let category = query._category // watch, ring
        let field = query._field
        let oparater = {}
        oparater.$eq = query._eq // ==
        oparater.$gt = query._gt // >
        oparater.$gte = query._gte // >=
        oparater.$lt = query._lt // <
        oparater.$lte = query._lte // <=
        oparater.$ne = query._ne // != || 

        const startIndex = Number((page - 1) * limit)
        const endIndex = Number(page * limit)


        let sortObj = {}
        let whereObj = {}

        //sort
        if (sort && order) sortObj = {
            [sort]: order,
        }

        // where
        if (field || category) {

            // <, <=, >, >=, ==, != (number)
            for (const property in oparater) {
                if (oparater[property] || oparater[property] == 0) {
                    let value = Number(oparater[property])
                    whereObj = {
                        [field]: { [property]: value, ...whereObj[field] }
                    }
                }
            }

            // category
            if (category) {
                whereObj.category = category
            }
        }


        try {
            let products = []
            let maxPrice = (await Product.findOne().sort({ price: 'desc' }).exec()).price
            let minPrice = (await Product.findOne().sort({ price: 'asc' }).exec()).price

            // pagination 
            let totalProduct = await Product.countDocuments(whereObj)
            let pagination = {
                current: page > Math.ceil(totalProduct / limit) ? 1 : page, // when current > total
                limit: limit,
                total: Math.ceil(totalProduct / limit)
            }

            products = (await Product.find(whereObj).sort(sortObj).limit(endIndex).exec()).slice(startIndex)

            return res.status(200).json({ success: true, products, pagination, maxPrice, minPrice })

        } catch (err) {
            return res.status(500).json({ success: false, message: err.message })
        }
    }

    //for admin
    // [GET] /products/all
    async getAllProduct(req, res) {

        try {
            const products = await Product.find({})
            return res.status(200).json({ success: true, products })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    // [POST] /products/:id
    async updateProduct(req, res) {
        const id = req.params.id

        try {

            const newProduct = await Product.findOneAndUpdate({ _id: id }, req.body, { returnDocument: 'after' })

            if (!newProduct) return res.status(400).json({ success: false, message: 'Product not found' })

            //all good
            return res.status(200).json({ success: true, message: 'Update product successfully', newProduct })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    // [DELETE] /products/:id
    async deleteProduct(req, res) {
        const id = req.params.id

        try {
            await Product.deleteOne({ _id: id })

            //all good
            return res.status(200).json({ success: true, message: 'Delete product successfully' })
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    // [POST] /products/
    async createProduct(req, res) {
        const product = req.body
        const { title, price, imageUrl } = product

        if (!title || !price || !imageUrl)
            return res.status(400).json({ success: false, message: 'Title, price, imageUrl is required' })

        product.imageUrl = imageUrl.startsWith('http://') ? imageUrl : `http://${imageUrl}`

        try {
            const newProduct = new Product(product)
            await newProduct.save()

            // all good
            return res.status(200).json({ success: true, message: 'Create product successfully', newProduct })

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
}


module.exports = new ProductController()