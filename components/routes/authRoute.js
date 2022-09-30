// make post request of login and register with password-hash and token provider
const router = require('express').Router()
const UserModel = require('../modules/userModel')
const map_user_req = require('../../helpers/map_user_req')

router.get('/',(req,res,next) => {
    UserModel.find((err,user) => {
        if(err) return next(err)
        res.json(user)
    })
})

router.post('/register',(req,res,next) => {
    const data = req.body
    const newUser = new UserModel({})
    console.log(data)
    const mappedUser = map_user_req(newUser, data)
    mappedUser.save((err,user) => {
        if(err) return next(err)
        res.json(user)
    })
    
})

router.post('/login', (req,res,next) => {
    const data = req.body
    UserModel.findOne({
        $or: [
            {username: data.username},
            {email: data.username}
        ]
    },(err,user) => {
        if(err) return json(err)
        if(!user) return json({
            msg: "User Not Found",
            status: 404
        })
        res.json(user)
    })
})

module.exports = router