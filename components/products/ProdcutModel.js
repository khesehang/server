const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// review schema 
const reviewSchema = new Schema({
    point: {
        type: Number, min: 1, max: 5, required: true
    },
    message: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
})


const ProductSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    description: String,
    category: {
        type: String,
        required: true,
    },
    brand: String,
    size: String,
    images: [String],
    price: Number,
    quantity: Number,
    status: {
        type: String,
        enum: ['out of stock', 'available', 'booked'],
        default: 'available',
    },
    modelNo: String,
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    warrentyStatus: Boolean,
    warrentyeriod: String,
    discount: {
        discountedItem: Boolean,
        discountType: {
            type: String,
            enum: ['percentage','quantity','vlaue']
        },
        discountValue: String,
    },
    color: String,
    isReturnEligible: Boolean,
    offers: [String],
    tags: [String], // Flashed sales, featured
    manuDate: Data,
    expiryDate: Date,
    salesDate: Date,
    purchaseDate: Date,
    returnedDate: Date,
    reviews: [reviewSchema]
}, {
    timestamps: true,
})

module.exports = mongoose.model('product', ProductSchema)