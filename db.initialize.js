const mongoose = require('mongoose')

const mongo_url = 'mongodb+srv://khesehang:khesehang@cluster0.xayqoby.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongo_url)
.then(success => {
    console.log('Connection Successful')
})
.catch(err => {
    console.log('Connection Error',err)
})