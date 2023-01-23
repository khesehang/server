const JWT = require('jsonwebtoken');
const UserModel = require('../components/modules/userModel');
const config = require('../components/configs/index')

module.exports = function (req, res, next) {
    let token;
    if (req.headers['authorization'])
        token = req.headers['authorization']
    if (req.headers['x-access-token'])
        token = req.headers['x-access-token']
    if (req.headers['token'])
        token = req.headers['token']
    if (req.query.token)
        token = req.query.token;

    if (!token) {
        return next({
            msg: 'Authorization Failed,Token Not Provided',
            status: 401
        })
    }
    console.log('tokne is>>>',token)
    // if token exist proceed with verification
    JWT.verify(token, config.JWT_SECRET, function (err, decoded) {
        if (err) {
            console.log('error in jwt',err)
            return next(err);
        }
        console.log('token verification successfull >>', decoded)
        UserModel.findById(decoded._id, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next({
                    msg: 'User removed from system',
                    status: 400
                })
            }
            req.user = user;;
            next();
        })

    })
}
