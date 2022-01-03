const express = require('express')
const { verifyToken, verifyAdmin } = require('../utils/verify')
const authRouter = express.Router()
const authController = require('../app/controllers/authController')

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/check', verifyToken, authController.checkAccessToken)
authRouter.get('/users', verifyToken, verifyAdmin, authController.getAllUser)
authRouter.delete('/users/:id', verifyToken, verifyAdmin, authController.deleteUser)
authRouter.get('/', verifyToken, authController.index)


module.exports = authRouter