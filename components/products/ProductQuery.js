const ProductModel  = require('./ProdcutModel')

function map_product_map(product, productData) {
    if(productData.name)
    product.name = productData.name
    if(productData.description)
    product.description = productData.description
    if(productData.category)
    product.category = productData.category
    if(productData.brand)
    product.brand = productData.brand
    if(productData.size)
    product.size = productData.size
    if(productData.images)
    product.images = productData.images
    if(productData.price)
    product.price = productData.price
    if(productData.quantity)
    product.quantity = productData.quantity
    if(productData.status)
    product.status = productData.status
    if(productData.modelNo)
    product.modelNo = productData.modelNo
    if(productData.vendor)
    product.vendor = productData.vendor
    if(productData.warrentyStatus)
    product.warrentyStatus = productData.warrentyStatus
    if(productData.color)
    product.color = productData.color
    if(productData.isreturnEligible)
    product.isreturnEligible = productData.isreturnEligible
    if(productData.manuDate)
    product.manuDate = productData.manuDate
    if(productData.vendor)
    product.vendor = productData.vendor
    if(productData.vendor)
    product.vendor = productData.vendor
    if(productData.vendor)
    product.vendor = productData.vendor
}