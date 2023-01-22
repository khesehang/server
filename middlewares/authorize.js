const jwt = require('jsonwebtoken')
const userModel = require('../components/modules/userModel')

const protect = async (req, res, next) => {
    let token;
    if (res.headers.authorization &&
        res.headers.authorization.startswith('Bearer ')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            res.user = await userModel.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            return enxt('Not Authorized, Token failed')
        }
    }
    if (!token) return next('Not Authorized, Token not found')
}

module.exports = { protect }