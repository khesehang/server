const { response } = require('express');
const ProdcutModel = require('./ProdcutModel');
const ProductQuery = require('./ProductQuery')

function post(req, res, next) {
    const data = req.body;

    ProductQuery.insert(data)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.next(err)
        })
}

function get(req, res, next) {
    console.log('product get',req.user)
    var condition = {}
    // if (req.user.role !== 1)
    //     condition.vendor = req.user._id
    ProductQuery.find(condition, req.query)
    .then(response => {
        console.log('product get response',response)
        res.json(response)
    })
    .catch(err => {
        return next(err)
    })
}

function update(req, res, next) {
    const data = req.body;
    console.log('data in update', data)

    if (data.vendor && typeof (data.vendor) === 'object') {
        data.vendor = data.vendor._id
    }
    ProductQuery.update(req.params.id, data)
        .then(response => {
            console.log('response on update')
            res.json(response)
        })
        .catch(err => {
            return next(err)
        })
}

function remove(req, res, next) {
    ProductQuery.remove(req.params.id)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            return next(err)
        })
}

function getById(req, res, next) {
    const condition = {
        _id: req.params.id
    }
    ProductQuery.find(condition)
        .then(response => {
            res.json(response[0])
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = {
    post,
    get,
    getById,
    update,
    remove,

}