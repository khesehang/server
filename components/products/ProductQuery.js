const ProductModel = require('./ProdcutModel')

function map_product_req(product, productData) {
    if (productData.name)
        product.name = productData.name
    if (productData.description)
        product.description = productData.description
    if (productData.category)
        product.category = productData.category.split(',')
    if (productData.brand)
        product.brand = productData.brand
    if (productData.size)
        product.size = productData.size
    if (productData.images)
        product.images = productData.images
    if (productData.price)
        product.price = productData.price
    if (productData.quantity)
        product.quantity = productData.quantity
    if (productData.status)
        product.status = productData.status
    if (productData.modelNo)
        product.modelNo = productData.modelNo
    if (productData.vendor)
        product.vendor = productData.vendor
    if (productData.warrentyStatus)
        product.warrentyStatus = productData.warrentyStatus
    if (productData.warrentyPeriod)
        product.warrentyPeriod = productData.warrentyPeriod
    if (productData.color)
        product.color = productData.color.split(',')
    if (productData.isreturnEligible)
        product.isreturnEligible = productData.isreturnEligible
    if (productData.manuDate)
        product.manuDate = productData.manuDate
    if (productData.salesDate)
        product.salesDate = productData.salesDate
    if (productData.purchaseDate)
        product.purchaseDate = productData.purchaseDate
    if (productData.returnedDate)
        product.returnedDate = productData.returnedDate
    if (productData.offers)
        product.offers = typeof (productData.offers) === 'string'
            ? productData.offers.split(',')
            : productData.offers
    if (productData.tags)
        product.tags = typeof (productData.tags) === 'string'
            ? productData.tags.split(',')
            : productData.tags
    if (productData.discount)
        product.discount = {}
    if (productData.discountedItem)
        product.discount.discountedItem = productData.discountedItem
    if (productData.discountedvalue)
        product.discount.discountedvalue = productData.discountedvalue
    if (productData.discountedvalue)
        product.discount.discountedvalue = productData.discountedvalue
}

function find(condition, params = {}) {
    // const perPage = params.perSize ? Number(params.pageSize) : 1000;
    // const currentPage = Number(params.pageNumber) || 1
    // const skipCount = perPage * (currentPage - 1)
    // return new Promise((resolve, reject) => {

    return ProductModel.find(condition)
        // .skip(skipCount)
        // .limit(perPage)
        .sort({ _id: -1 })
        // .populate('vendor', {
        //     username: 1
        // })
        // .populate('reviews.user', {
        //     username: 1
        // })
        .exec()
    // .then(product => {
    //     console.log('respnse in rpodnkljas')
    //     resolve(product)
    // })
    // .catch(err => {
    //     return reject(err)
    // })
    // })
}

function insert(data) {
    console.log('data in post data is',data)
    const newProduct = new ProductModel({})
    map_product_req(newProduct, data)
    return newProduct.save()
}

function update(id, data) {
    return new Promise(function (resolve, reject) {
        ProductModel.findById(id, function (err, product) {
            if (err) {
                return reject(err)
            }
            if (!product) {
                return reject({
                    msg: 'Product Not Found',
                    status: 400
                })
            }
            let oldUpdatedImages = [];
            if (data.filesToRemove && data.filesToRemove.length) {
                oldUpdatedImages = remove_existing_images(product.image, data.filesToRemove)
            }

            map_product_req(product, data)
            product.save((err, updated) => {
                if (err) return reject(err)
                console.log('update success')
                resolve(updated)
            })
        })
    })
}

function remove_existing_images(oldImages = [], filesToRemove = []) {
    let existingImagesCopy = [...oldImages]
    oldImages.forEach((image, index) => {
        if (filesToRemove.includes(image)) {
            existingImagesCopy.splice(index, 1)
        }
    })
    return existingImagesCopy;
}

function remove(id) {
    return new Promise((resolve, reject) => {
        ProductModel.findById(id, (err, product) => {
            if (err) return reject(err)
            if (!product) return reject({
                msg: 'Product Not Found',
                status: 400
            })
            product.remove((err, removed) => {
                if (err) return reject(err)
                resolve(removed)
            })
        })
    })
}

module.exports = {
    insert,
    find,
    update,
    remove,

}