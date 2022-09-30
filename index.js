const express = require('express')
const morgan = require('morgan')

const app = express()
require('./db.initialize')
require('dotenv').config()

app.use(morgan('dev'))

const ApiRoutes = require('./apiRoutes')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/api',ApiRoutes)

app.use((req,res,next) => {
    next({
        msg: 'NOT FOUND',
        status: 400
    })
})

app.use((error,req,res,next) => {
    res.json({
        msg: error.msg || error.message || 'NOT FOUND',
        status: error.status || 400
    })
})

app.listen(5000,() => {
    console.log(`Server listining on port 5000`)
})