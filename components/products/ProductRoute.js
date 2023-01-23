const router = require('express').Router();
const authorization = require('../../middlewares/authorize');
const ProductCtrl = require('./ProductController')

router.route('/')
    .get(authorization, ProductCtrl.get)
    .post(authorization, ProductCtrl.post)

router.route('/:id')
    .get(authorization, ProductCtrl.getById)
    .put(authorization, ProductCtrl.update)
    .delete(authorization, ProductCtrl.remove)

module.exports = router;