const router = require('express').Router();
const authorization = require('../../middlewares/authorize');
const ProductCtrl = require('./ProductController')
const Uploader = require('../../middlewares/uploader')('image')

router.route('/')
    .get(authorization, ProductCtrl.get)
    .post(authorization, Uploader.array('images'), ProductCtrl.post)

router.route('/:id')
    .get(authorization, ProductCtrl.getById)
    .put(authorization,Uploader.array('images'), ProductCtrl.update)
    .delete(authorization, ProductCtrl.remove)

module.exports = router;