const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

const app = express()
require('./db.initialize')
dotenv.config()


app.use(morgan('dev'))
app.use(cors())

const ApiRoutes = require('./apiRoutes')

// inbluit middleware for  serving static files
// app.use(express.static( 'uploads')) //internal serve (express as an independant application)
app.use('/files', express.static(path.join(__dirname, 'uploads'))) //enternal as well external server

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/api', ApiRoutes)

app.use((req, res, next) => {
    return next({
        msg: 'NOT FOUND',
        status: 400
    })
})

app.use((error, req, res, next) => {
    return res.json({
        msg: error.msg || error.message || 'NOT FOUND',
        status: error.status || 400
    })
})

app.listen(5000, () => {
    console.log(`Server listining on port 5000`)
})