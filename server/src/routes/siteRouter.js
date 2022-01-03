const express = require('express')
const siteRouter = express.Router()
const siteController = require('../app/controllers/siteController')

siteRouter.get('/', siteController.index)

module.exports = siteRouter