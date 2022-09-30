const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    middlename: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['LoginUser','NonLoginUser','Vendor'],
        default: 'NonLoginUser'
    },
    status: {
        type: String,
        enum: ['Active','notActive'],
        default: 'notActive'
    },
}, {
    timestamps: true
})

const UserModel = mongoose.model('users',UserSchema)
module.exports = UserModel