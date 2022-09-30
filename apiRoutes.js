const router = require('express').Router()

const AuthRoute = require('./components/routes/authRoute')

router.use('/auth',AuthRoute)

module.exports = router