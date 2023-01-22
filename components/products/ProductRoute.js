const router = require('express').Router();
const { protect } = require('../../middlewares/authorize');
const ProductCtrl = require('./ProductController')

router.route('/')
    .get(protect, ProductCtrl.get)
    .post(protect, ProductCtrl.post)

router.route('/:id')
    .get(protect, ProductCtrl.getById)
    .put(protect, ProductCtrl.update)
    .delete(protect, ProductCtrl.remove)

module.exports = router;