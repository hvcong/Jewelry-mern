require('dotenv').config()
const User = require('../app/models/User')
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token not found' })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) return res.status(402).json({ success: false, message: 'Token not valid' })
        // all true
        req.body.userId = decoded.userId
        next()
    })



}

async function verifyAdmin(req, res, next) {

    try {
        const user = await User.findOne({ _id: req.body.userId, role: 'admin' })
        if (!user) return res.status(400).json({ success: false, message: 'You are not admin' })

        // delete userId property
        let { userId, ...newBody } = req.body
        userId = null
        req.body = newBody
        // all good
        return next()

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports = {
    verifyToken,
    verifyAdmin
}