const ProductQuery = require('./ProductQuery')

function post(req, res, next) {
    if (req.fileTypeErr) return next({
        msg: 'Invaild File Format',
        status: 400
    })
    const data = req.body;
    console.log('data >>>', data)
    console.log('files>>>', req.files)
    data.vendor = req.user._id;
    if (req.files && req.files.length) {
        data.images = req.files.map((file) => {
            return file.filename
        })
    }
    ProductQuery.insert(data)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            return next(err)
        })
}

function get(req, res, next) {
    var condition = {}
    // if (req.user.role !== 1)
    // condition.vendor = req.user._id
    ProductQuery.find(condition, req.query)
        .then(response => {
            // console.log('product get response', response)
            res.json(response)
        })
        .catch(err => {
            return next(err)
        })
}

function update(req, res, next) {
    const data = req.body;
    console.log('data in update', data)
    if (req.fileTypeErr) {
        return next({
            msg: 'Invalid File Format',
            status: 400
        })
    }

    if (data.vendor && typeof (data.vendor) === 'object') {
        data.vendor = data.vendor._id
    }

    if(req.files && req.files.length) {
        data.newImage = req.files.map((file) => {
            return file.filename;
        } )
    }
    
    // note images are in string and old data re-corrupte so remove existing images from rquests
    delete data.images;

    const filesToRemove = data.filesToRemove
    .split(',')
    .map(img => {
        return img.split('images/')[1]
    })

    data.filesToRemove = filesToRemove;
    
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