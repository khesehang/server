const router = require('express').Router()

const AuthRoute = require('./components/routes/authRoute')
const ProductRoute = require('./components/products/ProductRoute')

router.use('/auth',AuthRoute)
router.use('/product',ProductRoute)


module.exports = router